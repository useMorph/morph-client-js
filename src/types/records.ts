type MorphRecordValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | null;

export type MorphRecord = Record<string, MorphRecordValue>;

export type EmptyRecord = Record<string, never>;

/**
 * record
 */
export type QueryRecordListResponse<R extends MorphRecord = MorphRecord> = {
  items: R[];
  count: number;
};

export type GeneralResponse = { message: string };

export type Values<R extends MorphRecord> = Array<{
  key: keyof R;
  value: MorphRecordValue;
}>;
