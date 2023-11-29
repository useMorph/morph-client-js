import { MorphRecord, EmptyRecord } from '../util/record';

export type RecordSortConditionUnit<R extends MorphRecord = EmptyRecord> = {
  key: keyof R;
  direction?: 'ascending' | 'descending';
  operator?: '<->' | '<=>' | '<#>';
  value?: string;
};
