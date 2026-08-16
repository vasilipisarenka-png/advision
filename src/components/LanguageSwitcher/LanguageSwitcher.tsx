import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/StoreContext';
import { LOCALES } from '../../i18n/translations';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = observer(() => {
  const { locale } = useStores();

  return (
    <div className="lang-switcher">
      {LOCALES.map((item) => (
        <button
          key={item.code}
          type="button"
          className={`lang-switcher__item ${locale.locale === item.code ? 'is-active' : ''}`}
          onClick={() => locale.setLocale(item.code)}
          title={item.label}
        >
          <span aria-hidden="true">{item.flag}</span>
          {item.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
});

export default LanguageSwitcher;
