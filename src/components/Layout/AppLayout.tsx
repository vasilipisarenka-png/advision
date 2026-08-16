import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './AppLayout.css';

const AppLayout: React.FC = observer(() => {
  const { auth } = useStores();
  const t = useT();
  const location = useLocation();
  const [isNavOpen, setNavOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.overview'), icon: '📊', end: true },
    { to: '/cameras', label: t('nav.cameras'), icon: '📷', end: false },
    { to: '/ads', label: t('nav.ads'), icon: '🖼️', end: false },
    { to: '/monitors', label: t('nav.monitors'), icon: '📺', end: false },
  ];

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  return (
    <div className={`app-layout ${isNavOpen ? 'app-layout--nav-open' : ''}`}>
      <div
        className="app-layout__backdrop"
        onClick={() => setNavOpen(false)}
        aria-hidden="true"
      />

      <aside className="app-layout__sidebar">
        <div className="app-layout__brand">
          <span className="app-layout__brand-icon">👁️</span>
          <span>AdVision</span>
        </div>
        <nav className="app-layout__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `app-layout__nav-item ${isActive ? 'is-active' : ''}`
              }
            >
              <span className="app-layout__nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="app-layout__main">
        <header className="app-layout__header">
          <button
            type="button"
            className="app-layout__menu-toggle"
            onClick={() => setNavOpen((v) => !v)}
            aria-label={isNavOpen ? t('layout.closeMenu') : t('layout.openMenu')}
          >
            {isNavOpen ? '✕' : '☰'}
          </button>
          <LanguageSwitcher />
          <div className="app-layout__user">
            <span className="app-layout__user-name">{auth.user?.name}</span>
            <span className="app-layout__user-email">{auth.user?.email}</span>
            <button type="button" className="app-layout__logout" onClick={() => auth.logout()}>
              {t('layout.logout')}
            </button>
          </div>
        </header>
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
});

export default AppLayout;
