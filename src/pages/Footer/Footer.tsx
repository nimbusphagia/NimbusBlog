import s from './Footer.module.css'
import { NavLink } from 'react-router-dom'

export function Footer() {
  const BloggerUrl = import.meta.env.VITE_NIMBUS_BLOGGER_URL;
  return (
    <footer
      className={`${s.footer}`}
    >
      <NavLink
        className={`dashedCard ${s.fLink}`}
        to='/'
      >
        NimbusBlog
      </NavLink>

      <NavLink
        className={`dashedCard ${s.fLink}`}
        to='https://github.com/nimbusphagia'
        rel="noopener noreferrer"
        target='_blank'
      >
        Made by Nimbusphagia
      </NavLink>
      <NavLink
        className={`dashedCard ${s.fLink}`}
        to={BloggerUrl}
        rel="noopener noreferrer"
        target='_blank'
      >
        NimbusBlogger
      </NavLink>
    </footer>
  )
}
