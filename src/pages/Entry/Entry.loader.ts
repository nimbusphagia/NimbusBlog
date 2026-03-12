import type { LoaderFunctionArgs } from "react-router-dom";
import type { Entry } from "../../types/Entry";
import { apiClient } from "../../apiClient";
import type { User } from "../../types/User";
export type loaderProps = {
  entry: Entry,
  user?: User,
};
export async function entryLoader({ params }: LoaderFunctionArgs): Promise<loaderProps> {
  try {
    const id = params.id;
    const entry = await apiClient<Entry>(`/public/entries/${id}`);
    try {
      const user = await apiClient<User>(`/me`);
      return { entry, user };
    } catch {
      return { entry };
    }

  } catch (error) {
    throw error;
  }
}
