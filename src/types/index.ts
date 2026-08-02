import { z } from 'zod';

import { applicationSchema, statusUnion, userSchema } from './validation';

export type TApplicationStatus = z.infer<typeof statusUnion>;

export type TUserData = Required<z.infer<typeof userSchema>>;

export interface IApplication extends z.infer<typeof applicationSchema> {
  id: string;
}

export interface IDropdownOption {
  id: string;
  displayName: string;
}

export interface IHeaderCell {
  id: string;
  displayName: string;
  twStyle?: string;
}

export interface ICell {
  id?: string;
  value: string;
  twStyle?: string;
}

export interface IRow {
  id?: string;
  cells: ICell[];
}

export interface ITable {
  headers: IHeaderCell[];
  rows: IRow[];
}
