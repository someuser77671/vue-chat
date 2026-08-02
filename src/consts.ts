import type { IApplication, TApplicationStatus, TUserData } from './types';

export const APPLICATION_STATUS_OPTIONS = [
  { id: 'active', displayName: 'Активен' },
  { id: 'completed', displayName: 'Завершен' },
  { id: 'in_progress', displayName: 'Выполняется' },
  { id: 'rejected', displayName: 'Отменен' },
] satisfies Array<{
  id: TApplicationStatus;
  displayName: string;
}>;

export const APPLICATION_STATUSES_SET = new Set<TApplicationStatus>(
  APPLICATION_STATUS_OPTIONS.map((option) => option.id),
);

export const INITIAL_APPLICATIONS = [
  {
    id: '1',
    name: 'Vladilen',
    phone: '79291012009',
    amount: 4200,
    status: 'completed',
  },
  {
    id: '2',
    name: 'Maxim',
    phone: '79291012009',
    amount: 2490,
    status: 'active',
  },
  {
    id: '3',
    name: 'Elena',
    phone: '79219082112',
    amount: 12231,
    status: 'in_progress',
  },
  {
    id: '4',
    name: 'Egor',
    phone: '79291012009',
    amount: 2490,
    status: 'rejected',
  },
  {
    id: '5',
    name: 'Vladilen',
    phone: '79291012009',
    amount: 1231231,
    status: 'active',
  },
  {
    id: '6',
    name: 'Vladilen',
    phone: '79291012009',
    amount: 123132,
    status: 'in_progress',
  },
  {
    id: '7',
    name: 'Федор',
    phone: '79291012009',
    amount: 1234,
    status: 'completed',
  },
] satisfies IApplication[];

export const INITIAL_LAST_ID = Number(INITIAL_APPLICATIONS.at(-1)?.id ?? 0);

export const REGISTERED_USERS_DATA = [
  {
    email: 'some.user@automation.testing',
    password: '123456',
  },
] satisfies TUserData[];

export const REGISTERED_USERS_DATA_MAP: Record<string, TUserData> =
  REGISTERED_USERS_DATA.reduce(
    (acc, user) => ({ ...acc, [user.email]: user }),
    {},
  );

export const DEBOUNCE_DELAY = 300;
