import { useLoaderData } from 'react-router-dom';
import s from './About.module.css'
export function AboutPage() {
  const { author } = useLoaderData();
  return (
    <div
      className={s.body}
    >
      <div
        className={`blueCard ${s.about}`}
      >

        <article
          className={s.article}
        >
          <header
            className={s.aHeader}
          >
            <img
              src={author.imgUrl}
              alt="" />
          </header>
          <div
            className={s.veil}
          >
            <div className={`dashedCard ${s.main}`}>
              <h1>
                {`Hi, I'm ${author.name}`}
              </h1>
              <p>
                {author.description}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
