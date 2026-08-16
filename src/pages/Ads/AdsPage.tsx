import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import Modal from '../../components/Modal/Modal';
import { AdMediaType } from '../../types';
import './AdsPage.css';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 МБ — данные хранятся как data URL прямо в памяти

type FileErrorCode = 'unsupportedType' | 'fileTooLarge';

const AdsPage: React.FC = observer(() => {
  const { ads, cameras, monitors } = useStores();
  const t = useT();
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [durationSec, setDurationSec] = useState(10);
  const [mediaType, setMediaType] = useState<AdMediaType | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [fileErrorCode, setFileErrorCode] = useState<FileErrorCode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetMedia = () => {
    setMediaType(null);
    setMediaUrl(null);
    setFileErrorCode(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const type: AdMediaType | null = file.type.startsWith('image/')
      ? 'image'
      : file.type.startsWith('video/')
      ? 'video'
      : null;

    if (!type) {
      setFileErrorCode('unsupportedType');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileErrorCode('fileTooLarge');
      return;
    }

    setFileErrorCode(null);
    const reader = new FileReader();
    reader.onload = () => {
      setMediaType(type);
      setMediaUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    ads.addAd({
      title,
      durationSec,
      mediaType: mediaType ?? undefined,
      mediaUrl: mediaUrl ?? undefined,
    });
    setTitle('');
    setDurationSec(10);
    resetMedia();
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTitle('');
    setDurationSec(10);
    resetMedia();
  };

  const usageFor = (adId: string) => {
    const cameraCount = cameras.cameras.filter((c) => c.adId === adId).length;
    const monitorCount = monitors.monitors.filter((m) => m.adId === adId).length;
    return { cameraCount, monitorCount };
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{t('ads.title')}</h1>
          <p>{t('ads.subtitle')}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
          {t('ads.add')}
        </button>
      </div>

      {ads.ads.length === 0 ? (
        <div className="empty-state">{t('ads.empty')}</div>
      ) : (
        <div className="ads-grid">
          {ads.ads.map((ad) => {
            const usage = usageFor(ad.id);
            return (
              <div key={ad.id} className={`ad-card ${ad.active ? '' : 'ad-card--inactive'}`}>
                {ad.mediaType === 'video' ? (
                  <video className="ad-card__media" src={ad.mediaUrl} muted loop autoPlay playsInline />
                ) : (
                  <img className="ad-card__media" src={ad.mediaUrl} alt={ad.title} />
                )}
                <div className="ad-card__body">
                  <div className="ad-card__title-row">
                    <span className="ad-card__title">{ad.title}</span>
                    <span className={`ad-card__status ${ad.active ? 'is-active' : ''}`}>
                      {ad.active ? t('ads.active') : t('ads.inactive')}
                    </span>
                  </div>
                  <div className="ad-card__meta">
                    {t('ads.meta', {
                      duration: ad.durationSec,
                      cameras: usage.cameraCount,
                      monitors: usage.monitorCount,
                    })}
                  </div>
                  <div className="ad-card__buttons">
                    <button type="button" className="btn btn-secondary" onClick={() => ads.toggleActive(ad.id)}>
                      {ad.active ? t('common.disable') : t('common.enable')}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => ads.removeAd(ad.id)}>
                      {t('common.delete')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <Modal title={t('ads.modalTitle')} onClose={closeModal}>
          <form onSubmit={handleAdd}>
            <label>
              {t('common.name')}
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Summer sale" required />
            </label>
            <label>
              {t('ads.durationLabel')}
              <input
                type="number"
                min={2}
                max={120}
                value={durationSec}
                onChange={(e) => setDurationSec(Number(e.target.value))}
                required
              />
            </label>
            <label>
              {t('ads.mediaLabel')}
              <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileChange} />
            </label>

            {fileErrorCode && <div className="form-error">{t(`ads.errors.${fileErrorCode}`)}</div>}

            {mediaUrl ? (
              <div className="ads-page__preview">
                {mediaType === 'video' ? (
                  <video src={mediaUrl} muted loop autoPlay playsInline />
                ) : (
                  <img src={mediaUrl} alt="" />
                )}
                <button type="button" className="btn btn-secondary" onClick={resetMedia}>
                  {t('ads.removeFile')}
                </button>
              </div>
            ) : (
              <p style={{ fontSize: 12, color: '#55606f', marginBottom: 14 }}>{t('ads.noFileHint')}</p>
            )}

            <button type="submit" className="btn btn-primary btn-block">
              {t('ads.addSubmit')}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
});

export default AdsPage;
