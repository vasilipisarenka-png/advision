/** Общее хранилище стора в localStorage — так открытая на другом экране /display видит те же данные, что и личный кабинет, и обновляется при изменениях в других вкладках. */

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Например, превышена квота localStorage из-за крупного видео в data URL — молча пропускаем.
  }
}

export function subscribeToStorage(key: string, onChange: (raw: string | null) => void): () => void {
  const handler = (e: StorageEvent) => {
    if (e.key === key) onChange(e.newValue);
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

/** Возвращает следующий числовой id вида `prefix-N` по уже имеющимся записям. */
export function nextNumericId(prefix: string, items: Array<{ id: string }>): number {
  let max = 0;
  const re = new RegExp(`^${prefix}-(\\d+)$`);
  items.forEach((item) => {
    const match = item.id.match(re);
    if (match) max = Math.max(max, Number(match[1]));
  });
  return max + 1;
}
