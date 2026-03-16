import { EntryList } from "./EntryList"
import type { MonthGroup } from "../types/BlogTypes"
type YearClassList = {
  container: string,
  header: string,
  months: string,
}
type ClassList = {
  container?: string,
  header?: string,
  entries?: string,
  entry?: string,
}
type YearListProps = {
  months: MonthGroup[],
  year: string,
  classList: YearClassList,
  monthClasses: ClassList,
}

export function YearList({ months, year, classList, monthClasses }: YearListProps) {
  return (
    <div
      className={`blueCard ${classList.container}`}
    >
      <header
        className={classList.header}
      >
        <h1>
          {year}
        </h1>
      </header>
      <div
        className={classList.months}
      >
        {months && months.map(({ month, entries }) => {
          return (
            <EntryList
              key={year + '_' + month}
              title={month}
              entries={entries}
              classList={monthClasses}
            />
          )
        })}
      </div>
    </div>
  )
}
