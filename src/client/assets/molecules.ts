import type { WeightedRandomConfig, Results } from "../../assets/types";
import { molecule } from "bunshi";
import { proxy } from "valtio";

export const weightedRandomConfigMolecule = molecule<WeightedRandomConfig<string>>(() =>
  proxy<WeightedRandomConfig<string>>({
    choices: ["1"],
    weights: [1],
  }),
);

export const initialConfigMolecule = molecule<WeightedRandomConfig<string>>(() =>
  proxy<WeightedRandomConfig<string>>({
    choices: ["1"],
    weights: [1],
  }),
);

export const resultsMolecule = molecule<Results>(() => proxy<Results>({ total: 0, individual: [] }));
