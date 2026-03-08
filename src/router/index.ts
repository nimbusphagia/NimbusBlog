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
        children: [{
          path: ':id',
          Component: EntryPage,
        }],
      },
      {
        path: 'author',
        Component: AboutPage,
        loader: aboutLoader,
        action: aboutAction,
      },
    ]
  }
]);
