// Local-only history of recent conversions. Blobs are kept in memory for the
// session so re-download works; localStorage stores just the metadata list so
// the panel survives reloads. Blobs are not persisted (too large, and files
// stay private by design).

export interface HistoryItem {
  id: string;
  filename: string;
  size: number;
  at: number;
}

const KEY = "fc_history";
const MAX = 20;

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function addHistory(items: HistoryItem[]): HistoryItem[] {
  const next = [...items, ...loadHistory()].slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Ignore quota or privacy-mode errors.
  }
  return next;
}

export function clearHistory() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignore.
  }
}
