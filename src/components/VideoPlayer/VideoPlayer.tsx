import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useT } from '../../i18n/useT';
import { useStores } from '../../stores/StoreContext';
import './VideoPlayer.css';

interface VideoPlayerProps {
  name: string;
  streamUrl: string;
  status: 'online' | 'offline';
}

const LOCALE_TAGS: Record<string, string> = { ru: 'ru-RU', en: 'en-GB', lt: 'lt-LT' };

/**
 * Плеер трансляции go2rtc.
 * go2rtc отдаёт готовую HTML-страницу плеера (WebRTC/MSE) по адресу вида
 * http://host:1984/stream.html?src=NAME — поэтому для реального потока
 * достаточно встроить её через <iframe>. Пока сервер не подключён,
 * показываем имитацию живого видео, чтобы интерфейс было удобно тестировать.
 */
const VideoPlayer: React.FC<VideoPlayerProps> = observer(({ name, streamUrl, status }) => {
  const t = useT();
  const { locale } = useStores();
  const [mode, setMode] = useState<'mock' | 'live'>('mock');
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const isOffline = status === 'offline';
  const timestamp = time.toLocaleTimeString(LOCALE_TAGS[locale.locale], { hour12: false });

  return (
    <div className={`video-player ${isOffline ? 'video-player--offline' : ''}`}>
      <div className="video-player__topbar">
        <span className={`video-player__badge ${isOffline ? 'video-player__badge--off' : ''}`}>
          <span className="video-player__dot" />
          {isOffline ? t('videoPlayer.offline') : t('videoPlayer.live')}
        </span>
        <span className="video-player__name">{name}</span>
        {!isOffline && <span className="video-player__time">{timestamp}</span>}
      </div>

      <div className="video-player__stage">
        {isOffline ? (
          <div className="video-player__offline-screen">
            <span className="video-player__offline-icon">📷</span>
            <p>{t('videoPlayer.cameraUnavailable')}</p>
          </div>
        ) : mode === 'live' ? (
          <iframe
            className="video-player__iframe"
            src={streamUrl}
            title={name}
            allow="autoplay"
          />
        ) : (
          <div className="video-player__mock">
            <div className="video-player__scanlines" />
            <div className="video-player__noise" />
            <span className="video-player__mock-icon">🎥</span>
          </div>
        )}
      </div>

      {!isOffline && (
        <div className="video-player__footer">
          <code className="video-player__url" title={streamUrl}>
            {streamUrl}
          </code>
          <button
            type="button"
            className="video-player__toggle"
            onClick={() => setMode((m) => (m === 'mock' ? 'live' : 'mock'))}
          >
            {mode === 'mock' ? t('videoPlayer.connect') : t('videoPlayer.showPlaceholder')}
          </button>
        </div>
      )}
    </div>
  );
});

export default VideoPlayer;
