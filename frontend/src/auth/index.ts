import { fetchMock, TVRMApiLoginMessages } from "./MockLoginRoute";
type TVRMLoginSessionToken = string;
interface IVRMLoginStorage {
  saveLogin(): void;
  restoreLogin(): string;
  clearLogin(): void;
  login: (email: string, password: string) => Promise<string>;
  isLoggedIn: () => Promise<boolean>;
  token: TVRMLoginSessionToken;
}
export class VRMLoginLocalStorage implements IVRMLoginStorage {
  token;
  constructor() {
    // constructor
    this.token = this.restoreLogin();
  }
  restoreLogin() {
    // restore token from local storage
    const token = localStorage.getItem("_login");
    const fields: TVRMLoginSessionToken = token ? JSON.parse(token) : "";
    return fields;
  }
  saveLogin() {
    // save token to local storage
    localStorage.setItem("_login", JSON.stringify(this.token));
  }
  clearLogin() {
    // clear token from local storage
    localStorage.removeItem("_login");
    this.token = "";
  }
  async login(email: string, password: string) {
    // Do api login request (insecure, mock only.)
    const login = await fetchMock("/api/login", {
      email: email,
      password: password,
    });
    // only json() has typings
    const loginResponse = await login.json();
    switch (loginResponse.message) {
      case TVRMApiLoginMessages.OK:
        if (typeof loginResponse.token !== "string")
          throw new Error("Ungültiger Token");
        this.token = loginResponse.token;
        this.saveLogin();
        break;
      case TVRMApiLoginMessages.ERRORUSER:
        throw new Error("Nutzer konnte nicht gefunden werden");
        break;
      case TVRMApiLoginMessages.ERRORPASSWORD:
        throw new Error("Passwort falsch");
        break;
    }
    return this.token;
  }
  async isLoggedIn() {
    if (this.token) {
      // check token on "server", should not be done everytime.. but for now it is.
      const login = await fetchMock("/api/token", {
        token: this.token,
      });
      const loginResponse = await login.json();
      if (loginResponse.status) return true;
    }
    return false;
  }
}
