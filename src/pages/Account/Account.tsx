import { Form, useFetcher, useLoaderData } from 'react-router-dom'
import s from './Account.module.css'
import { useEffect, useState } from 'react';
import type { FocusEvent } from 'react';
import type { User } from '../../types/User';

export function AccountPage() {
  const user = useLoaderData<User>();
  const fetcher = useFetcher();
  const [passwordPrompt, setPasswordPrompt] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (fetcher.data?.type === 'changePassword') {
      setPasswordPrompt(false);
      setSuccessMsg('Password changed successfully!');
      const timer = setTimeout(() => setSuccessMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.data]);
  useEffect(() => {
    if (fetcher.data?.type === 'changePassword') {
      setPasswordPrompt(false);
    }
  }, [fetcher.data]);

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    if (fetcher.state !== "idle") return;
    if (e.target.value === e.target.defaultValue) return;

    const form = e.currentTarget.form;
    if (!form) return;

    fetcher.submit(form);
  }

  return (
    <div
      className={`blueCard ${s.body}`}
    >
      <main
        className={`dashedCard ${s.main}`}
      >

        <header
          className={s.header}
        >
          <h1>Account</h1>
          {successMsg && <p className={s.success}>{successMsg}</p>}
        </header>
        <fetcher.Form
          className={s.form}
          method='post'
        >
          <div
            className={s.profileImg}>
            {user.imgUrl &&
              <img src={user.imgUrl} alt="" />
            }
            <input
              type="url"
              name='imgUrl'
              defaultValue={user.imgUrl}
              placeholder='Insert a valid img url'
              onBlur={handleBlur}
            />
          </div>
          <input type="hidden" name='userId' value={user.id} />
          <div
            className={s.fItem}>
            <label htmlFor="name">Username</label>
            <input
              id='name'
              name='name'
              type="text"
              defaultValue={user.name}
              onBlur={handleBlur}
            />
          </div>
          <div
            className={s.fItem}>
            <label htmlFor="email">Email</label>
            <input
              id='email'
              name='email'
              type="email"
              defaultValue={user.email}
              onBlur={handleBlur}
            />
          </div>

          <div
            className={s.fItem}>
            <label>Password</label>
            <button
              type='button'
              className={`dashedCard ${s.passwordPrompt}`}
              onClick={() => setPasswordPrompt(true)}
            >Change</button>
          </div>



          {passwordPrompt && (
            <div className={s.veil}>
              <div
                className={s.passwordForm}
              >
                <h1>Change Password</h1>
                {fetcher.data?.type === 'error' && (
                  <p className={s.error}>{fetcher.data.message}</p>
                )}
                <div
                  className={s.fItem}>
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    id='oldPassword'
                    name='oldPassword'
                    type="password"
                    placeholder='Old password'
                  />
                </div>
                <div
                  className={s.fItem}>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    id='newPassword'
                    name='newPassword'
                    type="password"
                    placeholder='New password'
                  />
                </div>
                <div
                  className={s.fItem}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type="password"
                    placeholder='New password'
                  />
                </div>
                <div
                  className={s.passwordBtns}
                >
                  <button
                    className={s.returnBtn}
                    onClick={() => setPasswordPrompt(false)}
                  >return</button>
                  <button
                    className={s.submitBtn}
                    name='intent'
                    value='changePassword'
                    type='submit'
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </fetcher.Form >

        <div className={s.logout}>
          <Form method="post" action="/logout">
            <button type="submit">Logout</button>
          </Form>
        </div>

      </main>
    </div>
  )
}
