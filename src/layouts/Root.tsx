import { Outlet } from "react-router-dom"
import { Navbar } from "../pages/Navbar/Navbar"
import s from './Root.module.css'

export default function RootLayout() {
  return (
    <div
      className={s.body}
    >
      <Navbar />
      <Outlet />
      <footer>
        <p>Nimbusphagia</p>
      </footer>
    </div>
  )
}
