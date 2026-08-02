export type ToString<T extends object> = {
  [K in keyof T]: string;
};
