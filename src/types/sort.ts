import { MorphRecord, EmptyRecord } from "./records";

export type RecordSortConditionUnit<R extends MorphRecord = EmptyRecord> = {
  key: keyof R;
  direction: "ascending" | "descending";
};
