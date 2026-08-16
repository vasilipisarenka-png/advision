import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import '../../styles/auth.css';

const RegisterPage: React.FC = observer(() => {
  const { auth } = useStores();
  const t = useT();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await auth.register(name, email, password);
    if (result.ok) {
      navigate('/', { replace: true });
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
        <p className="auth-card__subtitle">{t('auth.subtitleRegister')}</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            {t('auth.name')}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" required />
          </label>
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
              placeholder={t('auth.passwordMinHint')}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block" disabled={auth.isBusy}>
            {auth.isBusy ? t('auth.registering') : t('auth.registerButton')}
          </button>
        </form>

        <div className="auth-card__footer">
          {t('auth.haveAccount')} <Link to="/login">{t('auth.loginLink')}</Link>
        </div>
      </div>
    </div>
  );
});

export default RegisterPage;
