import s from './Signup.module.css'
import { useNavigation, useActionData, Form, NavLink } from 'react-router-dom';

export function SignupPage() {
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
          <h1>Register</h1>

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
              htmlFor="name"
            >Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
            />
          </div>


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

          <div
            className={s.fItem}
          >
            <label
              htmlFor="confirmPassword"
            >Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
        </div>
        <button
          className={`dashedCard ${s.registerBtn}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create"}
        </button>
        <div
          className={s.footnote}
        >
          <p>
            ALready have an account?
          </p>
          <NavLink
            to={'/login'}
            className={s.redirect}
          >Login</NavLink>
        </div>  </Form>

    </div>
  )

}

