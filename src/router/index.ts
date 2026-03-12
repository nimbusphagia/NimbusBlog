import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/Root";
import { ErrorPage } from "../pages/Error/Error";
import { Homepage } from "../pages/Home/Home";
import { homeLoader } from "../pages/Home/Home.loader";
import { homeAction } from "../pages/Home/Home.action";
import { EntriesPage } from "../pages/Entries/Entries";
import { entriesLoader } from "../pages/Entries/Entries.loader";
import { entriesAction } from "../pages/Entries/Entries.action";
import { AboutPage } from "../pages/About/About";
import { aboutLoader } from "../pages/About/About.loader";
import { aboutAction } from "../pages/About/About.action";
import { EntryPage } from "../pages/Entry/Entry";
import { AccountPage } from "../pages/Account/Account";
import { accountLoader } from "../pages/Account/Account.loader";
import { accountAction } from "../pages/Account/Account.action";
import { LoginPage } from "../pages/Login/Login";
import { loginLoader } from "../pages/Login/Login.loader";
import { loginAction } from "../pages/Login/Login.action";
import { SignupPage } from "../pages/Signup/Signup";
import { signupLoader } from "../pages/Signup/Signup.loader";
import { signupAction } from "../pages/Signup/Signup.action";
import { logoutAction } from "./logoutAction";
import { entryLoader } from "../pages/Entry/Entry.loader";
import { entryAction } from "../pages/Entry/Entry.action";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: Homepage,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: 'posts',
        Component: EntriesPage,
        loader: entriesLoader,
        action: entriesAction,

      },
      {
        path: 'posts/:id',
        Component: EntryPage,
        loader: entryLoader,
        action: entryAction,
      },
      {
        path: 'author',
        Component: AboutPage,
        loader: aboutLoader,
        action: aboutAction,
      },
      {
        path: 'account',
        id: "account-route",
        Component: AccountPage,
        loader: accountLoader,
        action: accountAction,
      },
      {
        path: 'login',
        Component: LoginPage,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: 'signup',
        Component: SignupPage,
        loader: signupLoader,
        action: signupAction,
      }
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
  }
]);
