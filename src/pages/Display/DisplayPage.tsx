import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import AdRotator from '../../components/AdRotator/AdRotator';
import './DisplayPage.css';

/**
 * Публичная страница монитора/ТВ — то, что физически показывается на экране.
 * Не требует авторизации: реальное устройство будет открывать эту ссылку в киоск-режиме браузера.
 */
const DisplayPage: React.FC = observer(() => {
  const { monitorId } = useParams<{ monitorId: string }>();
  const { monitors, cameras, ads } = useStores();
  const t = useT();

  const monitor = monitorId ? monitors.getById(monitorId) : undefined;

  if (!monitor) {
    return (
      <div className="display-page display-page--message">
        <p>{t('display.notFound')}</p>
      </div>
    );
  }

  const camera = monitor.cameraId ? cameras.getById(monitor.cameraId) : undefined;
  const assignedAd = ads.getById(monitor.adId);
  const rotatingAds = assignedAd ? [assignedAd] : ads.activeAds;

  return (
    <div className="display-page">
      <div className="display-page__header">
        <span>{monitor.name}</span>
        <span className="display-page__location">{monitor.location}</span>
      </div>

      <div className="display-page__body">
        <div className="display-page__camera">
          {camera ? (
            camera.status === 'online' ? (
              <iframe
                className="display-page__iframe"
                src={camera.streamUrl}
                title={camera.name}
                allow="autoplay"
              />
            ) : (
              <div className="display-page__offline">{t('display.cameraOffline', { name: camera.name })}</div>
            )
          ) : (
            <div className="display-page__offline">{t('display.noCamera')}</div>
          )}
        </div>
        <div className="display-page__ad">
          <AdRotator ads={rotatingAds} />
        </div>
      </div>
    </div>
  );
});

export default DisplayPage;
