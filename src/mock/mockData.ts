import { Ad, Camera, Monitor } from '../types';
import { placeholderImage } from './placeholder';

export const mockCameras: Camera[] = [
  {
    id: 'cam-1',
     name: 'Parking Lot',
    location: 'Vilnius, Gedimino Ave. 9',
    streamUrl: 'https://p181.tail519541.ts.net/stream.html?src=carwash_cam&mode=webrtc',
    status: 'online',
    adId: 'ad-1',
  },
  {
    id: 'cam-2',
     name: 'Office Entrance',
    location: 'Vilnius, Gedimino Ave. 9',
    streamUrl: 'http://192.168.1.134:1984/stream.html?src=carwash_cam&mode=webrtc',
    status: 'online',
    adId: 'ad-2',
  },
  {
    id: 'cam-3',
    name: 'Showroom 1',
    location: 'Vilnius, Konstitucijos Ave. 21',
    streamUrl: 'http://192.168.1.134:1984/stream.html?src=demo_cam&mode=webrtc',
    status: 'offline',
    adId: null,
  },
  {
    id: 'cam-4',
    name: 'Warehouse #2',
    location: 'Vilnius, Konstitucijos Ave. 21',
    streamUrl: 'http://192.168.1.11:1984/stream.html?src=cam4',
    status: 'online',
    adId: 'ad-1',
  },
];

export const mockAds: Ad[] = [
  {
    id: 'ad-1',
    title: 'Grand Opening Weekend — 30% Off Everything',
    mediaType: 'image',
    mediaUrl: placeholderImage('Grand Opening Weekend −30%', '#ff6b6b', '#f06595'),
    durationSec: 10,
    active: true,
  },
  {
    id: 'ad-2',
    title: 'Fresh Flowers, Delivered Daily',
    mediaType: 'video',
    mediaUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    durationSec: 8,
    active: true,
  },
  {
    id: 'ad-3',
    title: 'New Collection Just Landed',
    mediaType: 'image',
    mediaUrl: placeholderImage('New Collection Just Landed', '#4dabf7', '#3b5bdb'),
    durationSec: 6,
    active: false,
  },
];

export const mockMonitors: Monitor[] = [
  {
    id: 'mon-1',
    name: 'Entrance TV',
    location: 'Vilnius, Gedimino Ave. 9',
    status: 'online',
    cameraId: 'cam-1',
    adId: 'ad-1',
  },
  {
    id: 'mon-2',
    name: 'Checkout Area Monitor',
    location: 'Vilnius, Konstitucijos Ave. 21',
    status: 'online',
    cameraId: 'cam-3',
    adId: 'ad-2',
  },
  {
    id: 'mon-3',
    name: 'Lobby Screen',
    location: 'Vilnius, Konstitucijos Ave. 21',
    status: 'offline',
    cameraId: null,
    adId: null,
  },
];
