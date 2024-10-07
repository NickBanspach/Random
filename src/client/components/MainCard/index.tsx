import { weightedRandomConfigMolecule, resultsMolecule } from "../../assets/molecules";
import { RollButton, ExportButton, ResetButton } from "../";
import { type ReactElement, Fragment } from "react";
import { Card, Box, Divider } from "@mui/joy";
import { useMoleculeSnap } from "../../hooks";

const MainCard = ({
  bottomChildren,
  rightChildren,
}: {
  bottomChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}): ReactElement => {
  const configSnap = useMoleculeSnap(weightedRandomConfigMolecule);
  const resultsSnap = useMoleculeSnap(resultsMolecule);

  return (
    <>
      <Card variant="soft" className="flex flex-row max-h-[100vh]">
        <Box>
          <Box className="flex">
            <Box className="flex flex-col gap-4 mr-4">
              <Box className="flex justify-center w-full h-full">
                <RollButton />
              </Box>
              <Divider />
              <Box className="flex justify-center w-full h-full items-center">
                <span>Total: {resultsSnap.total}</span>
                {configSnap.choices.map((choice, index) => (
                  <Fragment key={index}>
                    <Divider orientation="vertical" className="mx-2" />
                    <span>
                      {choice.slice(0, 1).toUpperCase() + choice.slice(1)}:{" "}
                      {resultsSnap.individual[index] || 0}
                    </span>
                  </Fragment>
                ))}
              </Box>
            </Box>
            <Divider orientation="vertical" />
            <Box className="flex flex-col gap-4 ml-4">
              <ExportButton />
              <Divider />
              <ResetButton />
            </Box>
          </Box>
          {bottomChildren ? (
            <>
              <Divider className="my-4" />
              {bottomChildren}
            </>
          ) : null}
        </Box>
        {rightChildren ? (
          <>
            <Divider orientation="vertical" />
            <Box>{rightChildren}</Box>
          </>
        ) : null}
      </Card>
    </>
  );
};

export default MainCard;
