import s from './Entries.module.css'
import { YearList } from '../../components/YearList'
import { useLoaderData } from 'react-router-dom'
import type { YearGroup } from '../../types/BlogTypes';

export function EntriesPage() {
  const { entries } = useLoaderData();
  const yearListClasses = {
    container: s.yearList,
    header: s.ylHeader,
    months: s.ylMonths,
  }
  const monthListClasses = {
    container: s.monthList,
    header: s.mlHeader,
    entries: s.mlEntries,
    entry: s.mlEntry,
  }
  return (
    <div
      className={s.body}>
      <main className={s.main}>

        {entries && entries.map(({ year, months }: YearGroup) => {
          return (
            <YearList
              months={months}
              year={String(year)}
              classList={yearListClasses}
              monthClasses={monthListClasses}
            />
          )
        })}

      </main>
    </div>
  )
}
