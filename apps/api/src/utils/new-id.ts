import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);

const prefixes = {
  request: "req",
  session: "ses",
  user: "usr",
  token: "tok",
  account: "acc",
  channel: "chn",
  message: "msg",
  guild: "gui",
  text_channel: "tch",
} as const;

type Prefix = keyof typeof prefixes;

export function newId(prefix: Prefix): string {
  return [prefixes[prefix], nanoid(32)].join("_");
}
