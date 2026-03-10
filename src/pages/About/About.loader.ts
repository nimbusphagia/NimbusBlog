import { apiClient } from "../../apiClient";
import type { User } from "../../types/User";
const AUTHOR_ID = import.meta.env.VITE_NIMBUS_AUTHOR_ID;
export async function aboutLoader() {
  try {
    const author = await apiClient<User>(`/public/users/${AUTHOR_ID}`);
    return { author };
  } catch (error) {
    throw error;
  }
}
