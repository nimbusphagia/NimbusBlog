import { apiClient } from "../../apiClient";
import type { Entry } from "../../types/Entry";

const AUTHOR_ID = import.meta.env.VITE_NIMBUS_AUTHOR_ID;

export async function homeLoader() {
  try {
    const [mostRecent, mostLiked] = await Promise.all([
      apiClient<Entry[]>(`/users/${AUTHOR_ID}/entries?filter=mostRecent`),
      apiClient<Entry[]>(`/users/${AUTHOR_ID}/entries?filter=mostLiked`),
    ]);
    return { mostRecent, mostLiked };
  } catch (error) {
    throw error;
  }
}
