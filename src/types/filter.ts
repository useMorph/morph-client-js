import { EmptyRecord, MorphRecord } from "./records";

export type RecordFilterConditionUnit<R extends MorphRecord = EmptyRecord> = {
  key: keyof R;
  value?: string | number | boolean | string[] | number[] | boolean[] | null;
  operator:
    | "endsWith"
    | "startsWith"
    | "equal"
    | "notEqual"
    | "lessThan"
    | "lessThanOrEqual"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "isNull"
    | "notNull"
    | "like"
    | "in"
    | "notIn";
  isFixed?: boolean | undefined;
};

export type RecordFilterConditionUnitAnd<R extends MorphRecord = EmptyRecord> =
  {
    and: (
      | RecordFilterConditionUnit<R>
      | RecordFilterConditionUnitAnd<R>
      | RecordFilterConditionUnitOr<R>
    )[];
  };

export type RecordFilterConditionUnitOr<R extends MorphRecord = EmptyRecord> = {
  or: (
    | RecordFilterConditionUnit<R>
    | RecordFilterConditionUnitAnd<R>
    | RecordFilterConditionUnitOr<R>
  )[];
};
