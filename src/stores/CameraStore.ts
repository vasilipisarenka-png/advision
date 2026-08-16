import { makeAutoObservable, autorun, runInAction } from 'mobx';
import { Camera } from '../types';
import { mockCameras } from '../mock/mockData';
import { loadFromStorage, saveToStorage, subscribeToStorage, nextNumericId } from './persist';

const STORAGE_KEY = 'advision_cameras';

class CameraStore {
  cameras: Camera[] = loadFromStorage(STORAGE_KEY, mockCameras);
  private idCounter = nextNumericId('cam', this.cameras);

  constructor() {
    makeAutoObservable(this);

    autorun(() => saveToStorage(STORAGE_KEY, this.cameras));

    subscribeToStorage(STORAGE_KEY, (raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as Camera[];
        runInAction(() => {
          this.cameras = parsed;
        });
      } catch {
        // игнорируем повреждённые данные
      }
    });
  }

  get onlineCount(): number {
    return this.cameras.filter((c) => c.status === 'online').length;
  }

  getById(id: string): Camera | undefined {
    return this.cameras.find((c) => c.id === id);
  }

  addCamera(input: { name: string; location: string; streamUrl: string }): void {
    const camera: Camera = {
      id: `cam-${this.idCounter++}`,
      name: input.name.trim(),
      location: input.location.trim(),
      streamUrl: input.streamUrl.trim(),
      status: 'online',
      adId: null,
    };
    this.cameras.push(camera);
  }

  removeCamera(id: string): void {
    this.cameras = this.cameras.filter((c) => c.id !== id);
  }

  setAd(cameraId: string, adId: string | null): void {
    const camera = this.getById(cameraId);
    if (camera) camera.adId = adId;
  }

  toggleStatus(id: string): void {
    const camera = this.getById(id);
    if (camera) camera.status = camera.status === 'online' ? 'offline' : 'online';
  }
}

export default CameraStore;
