import s from './Login.module.css'
import { Form, NavLink, useActionData, useNavigation } from 'react-router-dom'

export function LoginPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const data = useActionData();
  return (
    <div
      className={`blueCard ${s.body}`}>
      <Form
        method="post"
        className={`dashedCard ${s.form}`}>
        <header
          className={s.fHeader}
        >
          <h1>Login</h1>

          {data?.error &&
            <p
              className={s.errorMsg}
            >{data.error}</p>
          }

        </header>
        <div
          className={s.fItems}>

          <div
            className={s.fItem}
          >
            <label
              htmlFor="email"
            >Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
            />
          </div>

          <div
            className={s.fItem}
          >
            <label
              htmlFor="password"
            >Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

        </div>
        <button
          className={`dashedCard ${s.loginBtn}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <div
          className={s.footnote}
        >
          <p>
            Don't have an account yet?
          </p>
          <NavLink
            to={'/signup'}
            className={s.redirect}
          >Register</NavLink>
        </div>  </Form>

    </div>
  )
}
