import { weightedRandomConfigMolecule, resultsMolecule } from "../../assets/molecules";
import { Casino, KeyboardArrowDown } from "@mui/icons-material";
import { Button, Select, Option, Box } from "@mui/joy";
import { type ReactElement, useState } from "react";
import { weightedRandom } from "../../assets/utils";
import { useMoleculeSnap } from "../../hooks";
import { useMolecule } from "bunshi/react";
import { useSnapshot } from "valtio/react";

const RollButton = (): ReactElement => {
  const configSnap = useMoleculeSnap(weightedRandomConfigMolecule);
  const [randomAmount, setRandomAmount] = useState<number>(1);
  const resultsProxy = useMolecule(resultsMolecule);
  const resultsSnap = useSnapshot(resultsProxy);
  const [open, setOpen] = useState(false);

  const random = weightedRandom<string>(configSnap.choices, configSnap.weights);

  const roll = () => {
    const results = { total: resultsSnap.total, individual: [...resultsSnap.individual] };
    configSnap.choices.forEach((_value, index) => {
      if (isNaN(results.individual[index])) {
        results.individual[index] = 0;
      }
    });

    for (let i = 0; i < randomAmount; i++) {
      const n = random();

      results.total++;
      results.individual[configSnap.choices.indexOf(n)]++;
    }

    resultsProxy.individual = results.individual;
    resultsProxy.total = results.total;
  };

  return (
    <>
      <Box className="flex justify-center items-center">
        <Button
          size="lg"
          variant="solid"
          className="rounded-l rounded-r-none"
          onClick={roll}
          startDecorator={<Casino />}
        >
          Roll
        </Button>
        <Select
          size="lg"
          variant="soft"
          placeholder="x1"
          listboxOpen={open}
          value={randomAmount}
          onClick={() => setOpen(!open)}
          className="rounded-r rounded-l-none min-w-[97.3666px] text-white"
          sx={{ bgcolor: "primary.solidBg", ":hover": { bgcolor: "primary.solidHoverBg" } }}
          indicator={<KeyboardArrowDown className="text-white" />}
          onChange={(_event, newRandomAmount) => {
            setOpen(false);
            if (newRandomAmount !== null) {
              setRandomAmount(newRandomAmount);
            }
          }}
        >
          <Option value="1">x1</Option>
          <Option value="10">x10</Option>
          <Option value="100">x100</Option>
          <Option value="250">x250</Option>
          <Option value="1000">x1000</Option>
        </Select>
      </Box>
    </>
  );
};

export default RollButton;
