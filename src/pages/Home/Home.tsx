import s from './Home.module.css'

export function Homepage() {
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
          className={`dottedTitle`}
        >Welcome</h1>
      </div>
      <div
        className={`blueCard ${s.recommendations}`}
      >
      </div>
    </div>
  )
}
