import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '../types';

const STORAGE_KEY = 'advision_user';

export type AuthErrorCode = 'emptyFields' | 'invalidCredentials' | 'fillAllFields' | 'passwordTooShort';

export interface AuthResult {
  ok: boolean;
  errorCode?: AuthErrorCode;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class AuthStore {
  user: User | null = null;
  isBusy = false;

  constructor() {
    makeAutoObservable(this);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.user = JSON.parse(raw) as User;
      } catch {
        this.user = null;
      }
    }
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  async login(email: string, password: string): Promise<AuthResult> {
    this.isBusy = true;
    await delay(500);
    this.isBusy = false;

    if (!email.trim() || !password) {
      return { ok: false, errorCode: 'emptyFields' };
    }
    if (password.length < 4) {
      return { ok: false, errorCode: 'invalidCredentials' };
    }

    const user: User = {
      id: `u_${hash(email)}`,
      name: email.split('@')[0],
      email: email.trim(),
    };
    this.setUser(user);
    return { ok: true };
  }

  async register(name: string, email: string, password: string): Promise<AuthResult> {
    this.isBusy = true;
    await delay(600);
    this.isBusy = false;

    if (!name.trim() || !email.trim() || !password) {
      return { ok: false, errorCode: 'fillAllFields' };
    }
    if (password.length < 4) {
      return { ok: false, errorCode: 'passwordTooShort' };
    }

    const user: User = {
      id: `u_${hash(email)}`,
      name: name.trim(),
      email: email.trim(),
    };
    this.setUser(user);
    return { ok: true };
  }

  logout(): void {
    runInAction(() => {
      this.user = null;
    });
    localStorage.removeItem(STORAGE_KEY);
  }

  private setUser(user: User): void {
    runInAction(() => {
      this.user = user;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

function hash(value: string): string {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

export default AuthStore;
