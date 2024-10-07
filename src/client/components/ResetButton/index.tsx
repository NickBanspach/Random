import { resultsMolecule } from "../../assets/molecules";
import { useMolecule } from "bunshi/react";
import type { ReactElement } from "react";
import { Button } from "@mui/joy";

const ResetButton = (): ReactElement => {
  const resultsProxy = useMolecule(resultsMolecule);

  return (
    <Button
      size="lg"
      variant="solid"
      onClick={() => {
        resultsProxy.individual = [];
        resultsProxy.total = 0;
      }}
    >
      Reset
    </Button>
  );
};

export default ResetButton;
