import { EmptyRecord, MorphRecord, Values } from './util/record';
import {
  RecordFilterConditionUnitAnd,
  RecordFilterConditionUnitOr,
} from './util/filter';
import { RecordSortConditionUnit } from './util/sort';

export type CreateRecordOptions<R extends MorphRecord = EmptyRecord> = {
  values: Values<R>;
  fixedValue: Values<R>;
};

export type QueryRecordOptions<R extends MorphRecord = EmptyRecord> = {
  select: (keyof R)[];
  filter?: RecordFilterConditionUnitAnd<R> | RecordFilterConditionUnitOr<R>;
  sort?: RecordSortConditionUnit<R>[];
  skip?: number;
  limit?: number;
};

export type UpdateRecordOptions<R extends MorphRecord = EmptyRecord> = {
  filter: RecordFilterConditionUnitAnd<R> | RecordFilterConditionUnitOr<R>;
  values: Values<R>;
  fixedValue: Values<R>;
};

export type DeleteRecordOptions<R extends MorphRecord = EmptyRecord> = {
  filter: RecordFilterConditionUnitAnd<R> | RecordFilterConditionUnitOr<R>;
};
