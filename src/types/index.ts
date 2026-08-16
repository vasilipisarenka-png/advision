export interface User {
  id: string;
  name: string;
  email: string;
}

export type CameraStatus = 'online' | 'offline';

export interface Camera {
  id: string;
  name: string;
  location: string;
  /** Ссылка на трансляцию go2rtc, например http://host:1984/stream.html?src=cam1 */
  streamUrl: string;
  status: CameraStatus;
  adId: string | null;
}

export type AdMediaType = 'image' | 'video';

export interface Ad {
  id: string;
  title: string;
  mediaType: AdMediaType;
  mediaUrl: string;
  durationSec: number;
  active: boolean;
}

export type MonitorStatus = 'online' | 'offline';

export interface Monitor {
  id: string;
  name: string;
  location: string;
  status: MonitorStatus;
  cameraId: string | null;
  adId: string | null;
}
