import React from 'react';
import { observer } from 'mobx-react-lite';
import { Ad } from '../../types';
import { useT } from '../../i18n/useT';
import './AdBanner.css';

interface AdBannerProps {
  ad?: Ad;
  emptyLabel?: string;
}

const AdBanner: React.FC<AdBannerProps> = observer(({ ad, emptyLabel }) => {
  const t = useT();

  if (!ad) {
    return (
      <div className="ad-banner ad-banner--empty">
        <span>{emptyLabel ?? t('common.notLinked')}</span>
      </div>
    );
  }

  return (
    <div className="ad-banner">
      {ad.mediaType === 'video' ? (
        <video
          className="ad-banner__media"
          src={ad.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img className="ad-banner__media" src={ad.mediaUrl} alt={ad.title} />
      )}
      <div className="ad-banner__info">
        <span className="ad-banner__title">{ad.title}</span>
        <span className="ad-banner__duration">{t('common.secondsShort', { count: ad.durationSec })}</span>
      </div>
    </div>
  );
});

export default AdBanner;
