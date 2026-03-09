import { NavLink } from 'react-router-dom'
import type { Entry } from '../types/Entry'

type ClassList = {
  container: string,
  header: string,
  entries: string,
  entry: string,
}
type EntryStatProps = {
  title: string,
  entries: Entry[],
  classList: ClassList,
}
export function EntryList({ title, entries, classList }: EntryStatProps) {
  return (
    <div className={`${classList.container}`}>
      <div className={classList.header}>
        <h3>{title}</h3>
      </div>
      <div className={classList.entries}>

        {entries.map(
          (entry) => {
            return (
              <div key={entry.id} >
                <NavLink
                  to={`/posts/${entry.id}`}
                  className={`dashedCard ${classList.entry}`}
                >{entry.title}</NavLink>
              </div>
            )
          }
        )}

      </div>
    </div >
  )
}
