export type MorphRecordValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | null;

export type MorphRecord = Record<string, MorphRecordValue>;

export type EmptyRecord = Record<string, never>;

export type Values<R extends MorphRecord> = Array<{
  key: keyof R;
  value: MorphRecordValue;
}>;
