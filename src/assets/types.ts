export type EncodeData = (data: string | object, maxLength?: number) => Uint8Array | BufferSource;
export type CalculateWeights = (choicesLength: number) => Array<number>;
export type UpdateProxy = (data: WeightedRandomConfig<string>) => void;
export type DecodeData = (data: AllowSharedBufferSource) => string;
export type UpdateConfig = (skipWarning?: boolean) => void;

export type WeightedRandomConfig<T> = {
  choices: Array<T>;
  weights: ArrayLike<number>;
};

export type Results = {
  total: number;
  individual: number[];
};
