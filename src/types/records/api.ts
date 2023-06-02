import { MorphRecord } from './util/record';
/**
 * record
 */
export type QueryRecordListResponse<R extends MorphRecord = MorphRecord> = {
  items: R[];
  count: number;
};

export type DownloadRecordsAsCsvResponse = {
  url: string;
};
