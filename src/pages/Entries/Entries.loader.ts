import { apiClient } from "../../apiClient";
import type { Entry } from "../../types/Entry";
import type { YearGroup } from "../../types/BlogTypes";

const AUTHOR_ID = import.meta.env.VITE_NIMBUS_AUTHOR_ID;

function groupEntriesByYear(entries: Entry[]): YearGroup[] {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
  );

  const map = new Map<number, Map<string, Entry[]>>();

  for (const entry of sorted) {
    const date = new Date(entry.publishedAt!);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    if (!map.has(year)) map.set(year, new Map());
    if (!map.get(year)!.has(month)) map.get(year)!.set(month, []);
    map.get(year)!.get(month)!.push(entry);
  }

  return Array.from(map.entries()).map(([year, months]) => ({
    year,
    months: Array.from(months.entries()).map(([month, entries]) => ({ month, entries })),
  }));
}

export async function entriesLoader() {
  try {
    const entries = await apiClient<Entry[]>(`/public/users/${AUTHOR_ID}/entries`)
    const orderedEntries = groupEntriesByYear(entries);
    return { entries: orderedEntries };
  } catch (error) {
    throw error;
  }
}
