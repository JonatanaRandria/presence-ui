

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`token`) as string);
  },
  getUserId: () => {
    return JSON.parse(window.localStorage.getItem(`userId`) as string);
  },
  setToken: ( key : string, token: string) => {
    window.localStorage.setItem(key, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`token`);
    window.localStorage.removeItem(`userid`);
  },
};

export default storage;
