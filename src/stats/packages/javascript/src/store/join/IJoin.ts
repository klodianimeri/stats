import { Select } from "./../../index";

export interface IJoin {
  On(table1Col: string, table2Col: string): Select;
  State(): [string, string, string];
}
