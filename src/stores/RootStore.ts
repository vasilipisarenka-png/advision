import AuthStore from './AuthStore';
import CameraStore from './CameraStore';
import AdStore from './AdStore';
import MonitorStore from './MonitorStore';
import LocaleStore from './LocaleStore';

class RootStore {
  auth = new AuthStore();
  cameras = new CameraStore();
  ads = new AdStore();
  monitors = new MonitorStore();
  locale = new LocaleStore();
}

export default RootStore;
