import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Ad } from '../../types';
import { useT } from '../../i18n/useT';
import './AdRotator.css';

interface AdRotatorProps {
  ads: Ad[];
}

/** Циклически показывает активные рекламные ролики — имитирует то, что увидит зритель на ТВ/мониторе. */
const AdRotator: React.FC<AdRotatorProps> = observer(({ ads }) => {
  const t = useT();
  const [index, setIndex] = useState(0);
  const current = ads[index % Math.max(ads.length, 1)];

  useEffect(() => {
    if (ads.length === 0) return undefined;
    const durationMs = (current?.durationSec ?? 8) * 1000;
    const id = setTimeout(() => setIndex((i) => (i + 1) % ads.length), durationMs);
    return () => clearTimeout(id);
  }, [index, ads, current]);

  useEffect(() => {
    setIndex(0);
  }, [ads.length]);

  if (!current) {
    return (
      <div className="ad-rotator ad-rotator--empty">
        <span>{t('display.noActiveAds')}</span>
      </div>
    );
  }

  return (
    <div className="ad-rotator">
      {current.mediaType === 'video' ? (
        <video
          key={current.id}
          className="ad-rotator__media"
          src={current.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img className="ad-rotator__media" src={current.mediaUrl} alt={current.title} />
      )}
      <div className="ad-rotator__caption">{current.title}</div>
      {ads.length > 1 && (
        <div className="ad-rotator__dots">
          {ads.map((ad, i) => (
            <span key={ad.id} className={`ad-rotator__dot ${i === index ? 'is-active' : ''}`} />
          ))}
        </div>
      )}
    </div>
  );
});

export default AdRotator;
