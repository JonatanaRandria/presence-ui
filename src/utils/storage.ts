// /src/utils/storage.ts

const storage = {
  getToken: (): string | null => {
    return window.localStorage.getItem(`token`);
  },
  getUserId: (): string | null => {
    return window.localStorage.getItem(`userId`);
  },
  setToken: (key : 'token' | 'userId', value: string) => {
    window.localStorage.setItem(key, value);
  },
  clearToken: () => {
    window.localStorage.removeItem(`token`);
    window.localStorage.removeItem(`userId`);
  },
};

export default storage;