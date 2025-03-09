import type { ColumnType } from "kysely";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Numeric = ColumnType<string, number | string, number | string>;

export interface Assets {
  ammount: Numeric;
  assetId: string;
  id: Generated<number>;
  userId: number;
}

export interface Transactions {
  ammount: Numeric;
  assetId: string;
  id: Generated<number>;
  madeAt: Generated<string>;
  price: Numeric;
  type: string;
  userId: number;
}

export interface User {
  email: string;
  firstName: string;
  id: Generated<number>;
  lastName: string;
  money: number;
  password: string;
}

export interface DB {
  assets: Assets;
  transactions: Transactions;
  user: User;
}
