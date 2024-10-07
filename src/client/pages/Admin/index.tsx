import {
  DialogContent,
  ModalDialog,
  DialogTitle,
  FormControl,
  Checkbox,
  Divider,
  Button,
  Modal,
  Table,
  Input,
  Box,
} from "@mui/joy";

import { weightedRandomConfigMolecule, initialConfigMolecule } from "../../assets/molecules";
import { type ReactElement, Fragment, useState } from "react";
import { calculateWeights } from "../../assets/utils";
import { UpdateConfig } from "../../../assets/types";
import { useMoleculeSnap } from "../../hooks";
import { AdminModal } from "../../components";
import { MainCard } from "../../components";
import { useMolecule } from "bunshi/react";
import { useSnapshot } from "valtio/react";
import { socket } from "../../socket";

const Admin = (): ReactElement => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [useWeights, setUseWeights] = useState(true);
  const [newChoice, setNewChoice] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const initialConfigSnap = useMoleculeSnap(initialConfigMolecule);
  const configProxy = useMolecule(weightedRandomConfigMolecule);
  const configSnap = useSnapshot(configProxy);

  const updateConfig: UpdateConfig = (skipWarning) => {
    if (!skipWarning && !(Array.from(configSnap.weights).reduce((acc, current) => acc + current, 0) === 1)) {
      setShowWarningModal(true);
      return;
    }
    socket.emit("updateConfig", configSnap);
  };

  return (
    <>
      <AdminModal>
        <Modal open={showWarningModal}>
          <ModalDialog>
            <DialogTitle>The Weights dont add up to 1</DialogTitle>
            <DialogContent>
              <Box>Do you still want to update the config?</Box>
              <Box className="flex justify-around items-center mt-3">
                <Button
                  size="lg"
                  variant="solid"
                  onClick={() => {
                    setShowWarningModal(false);
                    updateConfig(true);
                  }}
                >
                  Continue
                </Button>
                <Button size="lg" variant="solid" onClick={() => setShowWarningModal(false)}>
                  Exit
                </Button>
              </Box>
            </DialogContent>
          </ModalDialog>
        </Modal>
        <MainCard
          bottomChildren={
            <Box>
              <Table variant="plain" className="w-auto min-w-[100%]">
                <colgroup>
                  <col span={2} className="w-[30%]" />
                  <col span={1} className="w-[20%]" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Choice</th>
                    <th>Weight</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {configSnap.choices.map((choice, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td>{choice.slice(0, 1).toUpperCase() + choice.slice(1)}</td>
                        <td>{configSnap.weights[index]}</td>
                        <td className="flex justify-end items-center">
                          <Button
                            size="sm"
                            variant="soft"
                            color="danger"
                            onClick={() => {
                              configProxy.choices = configSnap.choices.filter((_, i) => i !== index);
                              if (useWeights) {
                                configProxy.weights = Array.from(configSnap.weights).filter(
                                  (_, i) => i !== index,
                                );
                              } else configProxy.weights = calculateWeights(configSnap.choices.length - 1);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                  <tr>
                    <td colSpan={3}>
                      <form
                        className="flex justify-between items-center"
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (configSnap.choices.includes(newChoice)) return;
                          if (configSnap.choices.length >= 10) return;

                          // Clone the choices array to ensure immutability
                          const newChoices = [...configSnap.choices, newChoice];
                          configProxy.choices = newChoices;

                          if (useWeights) {
                            setNewWeight("");
                            configProxy.weights = Array.from(configSnap.weights).concat(Number(newWeight));
                          } else {
                            const recalculatedWeights = calculateWeights(newChoices.length);
                            configProxy.weights = recalculatedWeights;
                          }

                          setNewChoice("");
                        }}
                      >
                        <FormControl className="w-full flex flex-row items-stretch justify-between">
                          <Input
                            required
                            name="choice"
                            value={newChoice}
                            className="w-[90px]"
                            onChange={(event) => setNewChoice(event.target.value)}
                          />
                          {useWeights && (
                            <Input
                              required
                              name="weight"
                              value={newWeight}
                              className="w-[90px]"
                              onChange={(event) => setNewWeight(event.target.value)}
                            />
                          )}
                          <Button size="sm" type="submit" color="neutral" variant="solid">
                            Add
                          </Button>
                        </FormControl>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Box>
          }
          rightChildren={
            <Box className="h-full">
              <Box className="h-[121px]">
                <Box className="h-[44px] flex justify-center items-center">
                  <Button size="lg" variant="solid" onClick={() => updateConfig(false)}>
                    Update
                  </Button>
                </Box>
                <Divider className="my-4" />
                <Box className="h-[44px] flex justify-center items-center">
                  <Checkbox
                    label="Use Weights"
                    checked={useWeights}
                    onChange={() => {
                      if (useWeights) configProxy.weights = calculateWeights(configSnap.choices.length);
                      setUseWeights(!useWeights);
                    }}
                  />
                </Box>
              </Box>
              <Divider className="my-4" />
              <Box>
                <Table variant="plain" className="w-auto min-w-[100%]">
                  <thead>
                    <tr>
                      <th>Choice</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialConfigSnap.choices.map((choice, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{choice.slice(0, 1).toUpperCase() + choice.slice(1)}</td>
                          <td>{initialConfigSnap.weights[index]}</td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </Box>
          }
        />
      </AdminModal>
    </>
  );
};

export default Admin;
