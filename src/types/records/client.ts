import { EmptyRecord, MorphRecord, Values } from './util/record';
import {
  RecordFilterConditionUnitAnd,
  RecordFilterConditionUnitOr,
} from './util/filter';
import { RecordSortConditionUnit } from './util/sort';
import { JoinConditionUnit } from './util/join';

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

export type AggregateRecordOptions = {
  aggregation: {
    key: string;
    operator: 'count' | 'sum' | 'mean' | 'median';
    filter?: RecordFilterConditionUnitAnd | RecordFilterConditionUnitOr;
  };
  groupKeys: string[];
  join?: JoinConditionUnit[];
  filter?: RecordFilterConditionUnitAnd | RecordFilterConditionUnitOr;
  sort?: RecordSortConditionUnit[];
  limit?: number;
  skip?: number;
};

export type DownloadRecordsAsCsvOptions = {
  select: string[];
  join: {
    targetTable: string;
    rules: JoinConditionUnit[];
  };
  filter?: RecordFilterConditionUnitAnd | RecordFilterConditionUnitOr;
  sort?: RecordSortConditionUnit[];
  limit?: number;
  skip?: number;
  additionalFilter?: RecordFilterConditionUnitAnd | RecordFilterConditionUnitOr;
  additionalSort?: RecordSortConditionUnit[];
};
