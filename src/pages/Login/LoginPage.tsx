import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import '../../styles/auth.css';

const LoginPage: React.FC = observer(() => {
  const { auth } = useStores();
  const t = useT();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('demo@advision.io');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await auth.login(email, password);
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(t(`auth.errors.${result.errorCode}`));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__lang">
        <LanguageSwitcher />
      </div>
      <div className="auth-card">
        <div className="auth-card__brand">
          <span>👁️</span>
          <span>AdVision</span>
        </div>
        <p className="auth-card__subtitle">{t('auth.subtitleLogin')}</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            {t('auth.email')}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </label>
          <label>
            {t('auth.password')}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block" disabled={auth.isBusy}>
            {auth.isBusy ? t('auth.loggingIn') : t('auth.loginButton')}
          </button>
        </form>

        <div className="auth-card__hint">{t('auth.demoHint')}</div>

        <div className="auth-card__footer">
          {t('auth.noAccount')} <Link to="/register">{t('auth.registerLink')}</Link>
        </div>
      </div>
    </div>
  );
});

export default LoginPage;
