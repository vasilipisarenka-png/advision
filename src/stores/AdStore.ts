import { makeAutoObservable, autorun, runInAction } from 'mobx';
import { Ad, AdMediaType } from '../types';
import { mockAds } from '../mock/mockData';
import { placeholderImage } from '../mock/placeholder';
import { loadFromStorage, saveToStorage, subscribeToStorage, nextNumericId } from './persist';

const STORAGE_KEY = 'advision_ads';

const PALETTE: Array<[string, string]> = [
  ['#ff6b6b', '#f06595'],
  ['#4dabf7', '#3b5bdb'],
  ['#f59f00', '#e8590c'],
  ['#51cf66', '#2f9e44'],
  ['#845ef7', '#5f3dc4'],
];

class AdStore {
  ads: Ad[] = loadFromStorage(STORAGE_KEY, mockAds);
  private idCounter = nextNumericId('ad', this.ads);

  constructor() {
    makeAutoObservable(this);

    autorun(() => saveToStorage(STORAGE_KEY, this.ads));

    subscribeToStorage(STORAGE_KEY, (raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as Ad[];
        runInAction(() => {
          this.ads = parsed;
        });
      } catch {
        // игнорируем повреждённые данные
      }
    });
  }

  get activeAds(): Ad[] {
    return this.ads.filter((a) => a.active);
  }

  getById(id: string | null | undefined): Ad | undefined {
    if (!id) return undefined;
    return this.ads.find((a) => a.id === id);
  }

  addAd(input: {
    title: string;
    durationSec: number;
    mediaType?: AdMediaType;
    mediaUrl?: string;
  }): void {
    const [from, to] = PALETTE[this.idCounter % PALETTE.length];
    const ad: Ad = {
      id: `ad-${this.idCounter++}`,
      title: input.title.trim(),
      mediaType: input.mediaUrl ? input.mediaType ?? 'image' : 'image',
      mediaUrl: input.mediaUrl ?? placeholderImage(input.title.trim(), from, to),
      durationSec: input.durationSec,
      active: true,
    };
    this.ads.push(ad);
  }

  removeAd(id: string): void {
    this.ads = this.ads.filter((a) => a.id !== id);
  }

  toggleActive(id: string): void {
    const ad = this.getById(id);
    if (ad) ad.active = !ad.active;
  }
}

export default AdStore;
