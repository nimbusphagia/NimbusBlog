import type { LoaderFunctionArgs } from "react-router-dom";
import type { Entry } from "../../types/Entry";
import { apiClient } from "../../apiClient";
import type { User } from "../../types/User";
export type loaderProps = {
  entry: Entry,
  user: User | null,
};
export async function entryLoader({ params }: LoaderFunctionArgs): Promise<loaderProps> {
  try {
    const id = params.id;
    const entry = await apiClient<Entry>(`/public/entries/${id}`);
    try {
      const current = await apiClient<User>("/me");
      const user = await apiClient<User>(`/public/users/${current.id}`)
      return { entry, user };
    } catch {
      return { entry, user: null };
    }

  } catch (error) {
    throw error;
  }
}
