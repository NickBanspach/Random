import { weightedRandomConfigMolecule, resultsMolecule } from "../../assets/molecules";
import { useMoleculeSnap } from "../../hooks";
import type { ReactElement } from "react";
import { Button } from "@mui/joy";
import XLSX from "xlsx";

const ExportButton = (): ReactElement => {
  const configSnap = useMoleculeSnap(weightedRandomConfigMolecule);
  const resultsSnap = useMoleculeSnap(resultsMolecule);

  const exportData = () => {
    const worksheet = XLSX.utils.json_to_sheet([]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Total",
          ...Array.from(configSnap.choices).map(
            (value) => value.slice(0, 1).toUpperCase() + value.slice(1),
          ),
        ],
      ],
      {
        origin: "A1",
      },
    );

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [[resultsSnap.total, ...resultsSnap.individual.map((value) => value || 0)]],
      {
        origin: "A2",
      },
    );

    XLSX.writeFile(workbook, "Results.xlsx", { compression: true });
  };

  return (
    <Button size="lg" variant="solid" onClick={exportData}>
      Export
    </Button>
  );
};

export default ExportButton;
