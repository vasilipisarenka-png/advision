import { makeAutoObservable, autorun, runInAction } from 'mobx';
import { Monitor } from '../types';
import { mockMonitors } from '../mock/mockData';
import { loadFromStorage, saveToStorage, subscribeToStorage, nextNumericId } from './persist';

const STORAGE_KEY = 'advision_monitors';

class MonitorStore {
  monitors: Monitor[] = loadFromStorage(STORAGE_KEY, mockMonitors);
  private idCounter = nextNumericId('mon', this.monitors);

  constructor() {
    makeAutoObservable(this);

    autorun(() => saveToStorage(STORAGE_KEY, this.monitors));

    subscribeToStorage(STORAGE_KEY, (raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as Monitor[];
        runInAction(() => {
          this.monitors = parsed;
        });
      } catch {
        // игнорируем повреждённые данные
      }
    });
  }

  get onlineCount(): number {
    return this.monitors.filter((m) => m.status === 'online').length;
  }

  getById(id: string): Monitor | undefined {
    return this.monitors.find((m) => m.id === id);
  }

  addMonitor(input: { name: string; location: string }): void {
    const monitor: Monitor = {
      id: `mon-${this.idCounter++}`,
      name: input.name.trim(),
      location: input.location.trim(),
      status: 'online',
      cameraId: null,
      adId: null,
    };
    this.monitors.push(monitor);
  }

  removeMonitor(id: string): void {
    this.monitors = this.monitors.filter((m) => m.id !== id);
  }

  setCamera(monitorId: string, cameraId: string | null): void {
    const monitor = this.getById(monitorId);
    if (monitor) monitor.cameraId = cameraId;
  }

  setAd(monitorId: string, adId: string | null): void {
    const monitor = this.getById(monitorId);
    if (monitor) monitor.adId = adId;
  }

  toggleStatus(id: string): void {
    const monitor = this.getById(id);
    if (monitor) monitor.status = monitor.status === 'online' ? 'offline' : 'online';
  }
}

export default MonitorStore;
