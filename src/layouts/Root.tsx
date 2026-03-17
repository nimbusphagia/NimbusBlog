import { ScrollRestoration, Outlet } from "react-router-dom"
import { Navbar } from "../pages/Navbar/Navbar"
import { Footer } from "../pages/Footer/Footer"
import s from './Root.module.css'
import { LoadingBar } from "../components/LoadingScreen"

export default function RootLayout() {
  return (
    <div
      className={s.body}
    >
      <LoadingBar />
      <ScrollRestoration getKey={(location) => location.state?.key ?? location.pathname} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

