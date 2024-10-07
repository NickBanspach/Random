import type { EncodeData, DecodeData } from "./types";

export const encodeData: EncodeData = (data, maxLength) => {
  return new TextEncoder().encode(typeof data == "string" ? data : JSON.stringify(data)).slice(0, maxLength);
};

export const decodeData: DecodeData = (data) => {
  return new TextDecoder().decode(data);
};
