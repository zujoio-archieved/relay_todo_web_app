class LocalStorage {
  static storeToken = async token => {
    await window.localStorage.setItem("TOKEN", token);
  };
  static getToken = async () => {
    return window.localStorage.getItem("TOKEN");
  };
  static clearToken = async () => {
    return window.localStorage.removeItem("TOKEN");
  };
}

export { LocalStorage };
