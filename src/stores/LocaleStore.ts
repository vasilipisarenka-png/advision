import { makeAutoObservable, autorun, runInAction } from 'mobx';
import { DEFAULT_LOCALE, Locale, TranslationTree, translations } from '../i18n/translations';
import { loadFromStorage, saveToStorage, subscribeToStorage } from './persist';

const STORAGE_KEY = 'advision_locale';

function resolve(tree: TranslationTree, path: string): string | undefined {
  const value = path.split('.').reduce<TranslationTree | string | undefined>((node, key) => {
    if (node && typeof node === 'object') return node[key];
    return undefined;
  }, tree);
  return typeof value === 'string' ? value : undefined;
}

class LocaleStore {
  locale: Locale = loadFromStorage<Locale>(STORAGE_KEY, DEFAULT_LOCALE);

  constructor() {
    makeAutoObservable(this, { t: false });

    autorun(() => saveToStorage(STORAGE_KEY, this.locale));

    subscribeToStorage(STORAGE_KEY, (raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as Locale;
        runInAction(() => {
          this.locale = parsed;
        });
      } catch {
        // игнорируем повреждённые данные
      }
    });
  }

  setLocale(locale: Locale): void {
    this.locale = locale;
  }

  t(key: string, params?: Record<string, string | number>): string {
    const template = resolve(translations[this.locale], key) ?? resolve(translations[DEFAULT_LOCALE], key) ?? key;
    if (!params) return template;
    return Object.entries(params).reduce(
      (acc, [paramKey, value]) => acc.replace(`{${paramKey}}`, String(value)),
      template
    );
  }
}

export default LocaleStore;
