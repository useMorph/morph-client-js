/**
 * record
 */

export type FieldType =
  | 'shortText'
  | 'longText'
  | 'singleSelect'
  | 'multiSelect'
  | 'datetime'
  | 'date'
  | 'time'
  | 'number'
  | 'decimal'
  | 'boolean'
  | 'autoNumber'
  | 'email'
  | 'image'
  | 'attachment'
  | 'createdAt'
  | 'phoneNumber'
  | 'url'
  | 'richText'
  | 'formula'
  | 'createdBy'
  | 'lastEditedAt'
  | 'lastEditedBy';

export type SimpleField = {
  name: string;
  displayName?: string;
  type: FieldType;
  nullable?: boolean;
  default?:
    | string
    | number
    | bigint
    | boolean
    | string[]
    | Record<string, unknown>
    | null;
  comment?: string;
  length?: number;
  unsigned?: boolean;
  members?: string[];
  formula?: string;
  relations?:
    | {
        targetTableFields?:
          | {
              displayName?: string | undefined;
              name: string;
            }[]
          | undefined;
        targetTable: string;
        targetField: string;
      }[]
    | undefined;
  originalTableSlug?: string[];
  primary?: boolean;
};

export type SimpleFieldListResponse = {
  fields: SimpleField[];
};
