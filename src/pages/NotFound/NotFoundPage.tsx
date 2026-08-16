import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useT } from '../../i18n/useT';

const NotFoundPage: React.FC = observer(() => {
  const t = useT();
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        color: '#8a94a3',
      }}
    >
      <h1 style={{ fontSize: 32, color: '#e7ecf3' }}>404</h1>
      <p>{t('notFound.message')}</p>
      <Link to="/" className="btn btn-primary">
        {t('notFound.home')}
      </Link>
    </div>
  );
});

export default NotFoundPage;
