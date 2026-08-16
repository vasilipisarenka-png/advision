import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStores } from '../../stores/StoreContext';
import { useT } from '../../i18n/useT';
import StatCard from '../../components/StatCard/StatCard';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import AdBanner from '../../components/AdBanner/AdBanner';
import './DashboardPage.css';

const DashboardPage: React.FC = observer(() => {
  const { cameras, ads, monitors, auth } = useStores();
  const t = useT();

  const previewCameras = cameras.cameras.slice(0, 2);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{t('dashboard.welcome', { name: auth.user?.name ?? '' })}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </div>
      </div>

      <div className="dashboard__stats">
        <StatCard
          icon="📷"
          label={t('dashboard.statCamerasOnline')}
          value={`${cameras.onlineCount} / ${cameras.cameras.length}`}
        />
        <StatCard
          icon="🖼️"
          label={t('dashboard.statActiveAds')}
          value={ads.activeAds.length}
          hint={t('dashboard.statAdsHint', { total: ads.ads.length })}
        />
        <StatCard
          icon="📺"
          label={t('dashboard.statMonitorsOnline')}
          value={`${monitors.onlineCount} / ${monitors.monitors.length}`}
        />
      </div>

      <div className="dashboard__section-header">
        <h2>{t('dashboard.activeStreams')}</h2>
        <Link to="/cameras" className="dashboard__link">
          {t('dashboard.allCameras')}
        </Link>
      </div>

      <div className="dashboard__grid">
        {previewCameras.map((camera) => (
          <div key={camera.id} className="dashboard__pair">
            <VideoPlayer name={camera.name} streamUrl={camera.streamUrl} status={camera.status} />
            <AdBanner ad={ads.getById(camera.adId)} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default DashboardPage;
