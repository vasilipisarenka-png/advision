import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import Modal from '../../components/Modal/Modal';
import './MonitorsPage.css';

const MonitorsPage: React.FC = observer(() => {
  const { monitors, cameras, ads } = useStores();
  const t = useT();
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    monitors.addMonitor({ name, location });
    setName('');
    setLocation('');
    setModalOpen(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{t('monitors.title')}</h1>
          <p>{t('monitors.subtitle')}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
          {t('monitors.add')}
        </button>
      </div>

      {monitors.monitors.length === 0 ? (
        <div className="empty-state">{t('monitors.empty')}</div>
      ) : (
        <div className="monitors-list">
          {monitors.monitors.map((monitor) => (
            <div key={monitor.id} className="monitor-row">
              <div className="monitor-row__main">
                <span className={`monitor-row__status ${monitor.status === 'online' ? 'is-online' : ''}`} />
                <div>
                  <div className="monitor-row__name">{monitor.name}</div>
                  <div className="monitor-row__location">{monitor.location || t('common.noLocation')}</div>
                </div>
              </div>

              <label className="monitor-row__field">
                {t('monitors.cameraLabel')}
                <select
                  value={monitor.cameraId ?? ''}
                  onChange={(e) => monitors.setCamera(monitor.id, e.target.value || null)}
                >
                  <option value="">{t('common.notSelected')}</option>
                  {cameras.cameras.map((camera) => (
                    <option key={camera.id} value={camera.id}>
                      {camera.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="monitor-row__field">
                {t('monitors.adLabel')}
                <select
                  value={monitor.adId ?? ''}
                  onChange={(e) => monitors.setAd(monitor.id, e.target.value || null)}
                >
                  <option value="">{t('common.notSelected')}</option>
                  {ads.ads.map((ad) => (
                    <option key={ad.id} value={ad.id}>
                      {ad.title}
                    </option>
                  ))}
                </select>
              </label>

              <div className="monitor-row__actions">
                <Link
                  to={`/display/${monitor.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  {t('monitors.openScreen')}
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => monitors.toggleStatus(monitor.id)}
                >
                  {monitor.status === 'online' ? t('common.disable') : t('common.enable')}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => monitors.removeMonitor(monitor.id)}
                >
                  {t('common.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal title={t('monitors.modalTitle')} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleAdd}>
            <label>
              {t('common.name')}
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Lobby TV" required />
            </label>
            <label>
              {t('common.location')}
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, address" />
            </label>
            <button type="submit" className="btn btn-primary btn-block">
              {t('monitors.addSubmit')}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
});

export default MonitorsPage;
