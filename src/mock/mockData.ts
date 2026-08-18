import { Ad, Camera, Monitor } from '../types';
import { placeholderImage } from './placeholder';

export const mockCameras: Camera[] = [
  {
    id: 'cam-1',
    name: 'Вход в офис',
    location: 'Москва, ул. Тверская 12',
    streamUrl: 'http://192.168.1.134:1984/stream.html?src=carwash_cam&mode=webrtc',
    status: 'online',
    adId: 'ad-1',
  },
  {
    id: 'cam-2',
    name: 'Парковка',
    location: 'Москва, ул. Тверская 12',
    streamUrl: 'https://councils-personals-treat-limit.trycloudflare.com/stream.html?src=carwash_cam&mode=webrtc',
    status: 'online',
    adId: 'ad-2',
  },
  {
    id: 'cam-3',
    name: 'Торговый зал',
    location: 'Санкт-Петербург, Невский пр. 45',
    streamUrl: 'http://192.168.1.11:1984/stream.html?src=cam3',
    status: 'offline',
    adId: null,
  },
  {
    id: 'cam-4',
    name: 'Склад №2',
    location: 'Санкт-Петербург, Невский пр. 45',
    streamUrl: 'http://192.168.1.11:1984/stream.html?src=cam4',
    status: 'online',
    adId: 'ad-1',
  },
];

export const mockAds: Ad[] = [
  {
    id: 'ad-1',
    title: 'Летняя распродажа -30%',
    mediaType: 'image',
    mediaUrl: placeholderImage('Летняя распродажа −30%', '#ff6b6b', '#f06595'),
    durationSec: 10,
    active: true,
  },
  {
    id: 'ad-2',
    title: 'Новая коллекция уже в магазине',
    mediaType: 'image',
    mediaUrl: placeholderImage('Новая коллекция', '#4dabf7', '#3b5bdb'),
    durationSec: 8,
    active: true,
  },
  {
    id: 'ad-3',
    title: 'Кофе с собой — каждый второй бесплатно',
    mediaType: 'image',
    mediaUrl: placeholderImage('Кофе с собой ☕', '#f59f00', '#e8590c'),
    durationSec: 6,
    active: false,
  },
];

export const mockMonitors: Monitor[] = [
  {
    id: 'mon-1',
    name: 'Телевизор у входа',
    location: 'Москва, ул. Тверская 12',
    status: 'online',
    cameraId: 'cam-1',
    adId: 'ad-1',
  },
  {
    id: 'mon-2',
    name: 'Монитор кассовой зоны',
    location: 'Санкт-Петербург, Невский пр. 45',
    status: 'online',
    cameraId: 'cam-3',
    adId: 'ad-3',
  },
  {
    id: 'mon-3',
    name: 'Экран в холле',
    location: 'Санкт-Петербург, Невский пр. 45',
    status: 'offline',
    cameraId: null,
    adId: null,
  },
];
