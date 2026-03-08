import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { NavItem } from '../../components/NavItem'

export function Navbar() {
  return (
    <nav
      className={`${s.navbar} blueCard`}
    >
      <div className={`logo ${s.navLogo}`}>
        NimbusBlog
      </div>
      <div
        className={s.navLinks}
      >
        <NavItem
          path='/'
          name='Home'
        />
        <NavItem
          path='/posts'
          name='Blog'
        />
        <NavItem
          path='/author'
          name='Author'
        />
      </div>
      <div >
        <NavLink
          to='/account'
          className={`${s.login} dashedCard`}
        >Account</NavLink>
      </div>
    </nav>
  )
}
