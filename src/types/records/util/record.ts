export type MorphRecord = Record<string, unknown>;

export type EmptyRecord = Record<string, never>;

export type Values<R extends MorphRecord> = Array<
  {
    [K in keyof R]: { key: K; value: R[K] };
  }[keyof R]
>;
