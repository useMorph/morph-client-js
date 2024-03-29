import { EmptyRecord, MorphRecord } from '../util/record';

export type RecordFilterConditionUnit<R extends MorphRecord = EmptyRecord> = {
  key: keyof R;
  value?: string | number | boolean | string[] | number[] | boolean[] | null;
  operator:
    | 'endsWith'
    | 'startsWith'
    | 'equal'
    | 'notEqual'
    | 'lessThan'
    | 'lessThanOrEqual'
    | 'greaterThan'
    | 'greaterThanOrEqual'
    | 'isNull'
    | 'notNull'
    | 'like'
    | 'in'
    | 'notIn';
  isFixed?: boolean | undefined;
  embeddingOperator?: '<->' | '<=>' | '<#>';
  embeddingValue?: string;
};

export type RecordFilterConditionUnitAnd<
  R extends MorphRecord = EmptyRecord
> = {
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
