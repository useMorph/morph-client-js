import { MorphRecord, EmptyRecord } from '../util/record';

export type RecordSortConditionUnit<R extends MorphRecord = EmptyRecord> = {
  key: keyof R;
  direction: 'ascending' | 'descending';
  //応急処置: Similarity Search対応
  operator?: '<->' | '<=>' | '<#>';
  value?: 'banana';
};
