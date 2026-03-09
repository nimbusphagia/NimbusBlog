import type { Entry } from "./Entry";

export type MonthGroup = { month: string; entries: Entry[] };
export type YearGroup = { year: number; months: MonthGroup[] };


