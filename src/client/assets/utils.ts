import { CalculateWeights } from "../../assets/types";
import type { IRandom } from "@thi.ng/random/api";
import { SYSTEM } from "@thi.ng/random/system";

// Cant define a seperate type because T is needed inside of the function
export const weightedRandom = <T>(
  choices: Array<T> | readonly T[],
  weights: ArrayLike<number>,
): (() => T) => {
  const rnd: IRandom = SYSTEM;

  const opts: Array<[number, T]> = choices
    .map((x, i) => <[number, T]>[weights[i] || 0, x])
    .sort((a, b) => b[0] - a[0]);

  const total: number = opts.reduce((acc, o) => acc + o[0], 0);

  if (total <= 0) console.warn("total weights <= 0");

  // Linear search algorithm
  return () => {
    const r: number = rnd.float(total);
    let sum: number = total;
    for (const opt of opts) {
      sum -= opt[0];
      if (sum <= r) {
        return opt[1] satisfies T;
      }
    }
    return (<T>undefined) satisfies T;
  };
};

export const calculateWeights: CalculateWeights = (choicesLength) => {
  const weights = new Array(choicesLength).fill(parseFloat((1 / choicesLength).toFixed(3)));
  const sum = parseFloat((weights.reduce((acc, current) => acc + current, 0) as number).toFixed(4));
  if (sum < 1) weights[weights.length - 1] += 1 - sum;
  return weights satisfies Array<number>;
};
