import s from './Home.module.css'
import { EntryList } from '../../components/EntryList'
import { useLoaderData } from 'react-router-dom'

export function Homepage() {
  const { mostRecent, mostLiked } = useLoaderData();
  const entryListClasses = {
    container: s.entryList,
    header: s.elHeader,
    entries: s.elEntries,
    entry: s.elEntry,
  }
  return (
    <div
      className={s.body}
    >
      <div
        className={`blueCard ${s.banner}`}
      >
        <img
          className={s.heroImage}
          src="https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1697327621162-IWYJTBR84RYH3V5WAMC7/Art_of_Alariko_18.jpeg" alt="" />
        <h1
          className={s.bannerTitle}
        >Welcome</h1>
      </div>
      <div
        className={`blueCard ${s.recommendations}`}
      >
        <header
          className={s.rHeader}
        >
          Recommendations
        </header>
        <div className={s.rLists}>
          <EntryList
            title='Most Recent'
            entries={mostRecent}
            classList={entryListClasses}
          />
          <EntryList
            title='Most Liked'
            entries={mostLiked}
            classList={entryListClasses}
          />

        </div>
      </div>
    </div>
  )
}
