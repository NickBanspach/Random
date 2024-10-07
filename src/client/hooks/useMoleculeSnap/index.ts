import { type MoleculeOrInterface, useMolecule } from "bunshi/react";
import type { Snapshot } from "valtio/vanilla";
import { useSnapshot } from "valtio/react";

const useMoleculeSnap = <T extends object>(molecule: MoleculeOrInterface<T>): Snapshot<T> => {
  return useSnapshot(useMolecule(molecule));
};

export default useMoleculeSnap;
