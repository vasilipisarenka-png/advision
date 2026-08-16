import { useStores } from '../stores/StoreContext';

/** Функция перевода: t('cameras.title'), t('common.secondsShort', { count: 10 }) */
export function useT() {
  const { locale } = useStores();
  return locale.t.bind(locale);
}
