import { ScrollRestoration, Outlet } from "react-router-dom"
import { Navbar } from "../pages/Navbar/Navbar"
import { Footer } from "../pages/Footer/Footer"
import s from './Root.module.css'

export default function RootLayout() {
  return (
    <div
      className={s.body}
    >
      <ScrollRestoration getKey={(location) => location.state?.key ?? location.pathname} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
