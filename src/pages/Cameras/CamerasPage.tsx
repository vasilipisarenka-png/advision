import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import AdBanner from '../../components/AdBanner/AdBanner';
import Modal from '../../components/Modal/Modal';
import './CamerasPage.css';

const CamerasPage: React.FC = observer(() => {
  const { cameras, ads } = useStores();
  const t = useT();
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [streamUrl, setStreamUrl] = useState('');

  const resetForm = () => {
    setName('');
    setLocation('');
    setStreamUrl('');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !streamUrl.trim()) return;
    cameras.addCamera({ name, location, streamUrl });
    resetForm();
    setModalOpen(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{t('cameras.title')}</h1>
          <p>{t('cameras.subtitle')}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
          {t('cameras.add')}
        </button>
      </div>

      {cameras.cameras.length === 0 ? (
        <div className="empty-state">{t('cameras.empty')}</div>
      ) : (
        <div className="cameras-grid">
          {cameras.cameras.map((camera) => (
            <div key={camera.id} className="camera-card">
              <VideoPlayer name={camera.name} streamUrl={camera.streamUrl} status={camera.status} />
              <div className="camera-card__side">
                <div>
                  <div className="camera-card__location">{camera.location || t('common.noLocation')}</div>
                  <AdBanner ad={ads.getById(camera.adId)} />
                </div>
                <div className="camera-card__controls">
                  <label>
                    {t('cameras.linkedAd')}
                    <select
                      value={camera.adId ?? ''}
                      onChange={(e) => cameras.setAd(camera.id, e.target.value || null)}
                    >
                      <option value="">{t('common.notLinked')}</option>
                      {ads.ads.map((ad) => (
                        <option key={ad.id} value={ad.id}>
                          {ad.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="camera-card__buttons">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => cameras.toggleStatus(camera.id)}
                    >
                      {camera.status === 'online' ? t('common.disable') : t('common.enable')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => cameras.removeCamera(camera.id)}
                    >
                      {t('common.delete')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal title={t('cameras.modalTitle')} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleAdd}>
            <label>
              {t('common.name')}
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Front entrance" required />
            </label>
            <label>
              {t('common.location')}
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, address"
              />
            </label>
            <label>
              {t('cameras.streamUrlLabel')}
              <input
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="http://host:1984/stream.html?src=cam1"
                required
              />
            </label>
            <button type="submit" className="btn btn-primary btn-block">
              {t('cameras.addSubmit')}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
});

export default CamerasPage;
