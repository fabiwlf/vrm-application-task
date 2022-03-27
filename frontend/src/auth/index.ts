import { fetchMock, TVRMApiLoginMessages } from "./MockLoginRoute";
type TVRMLoginSessionToken = string;
interface IVRMLoginStorage {
  saveLogin(): void;
  restoreLogin(): void;
  login: (email: string, password: string) => void;
  isLoggedIn: () => Promise<boolean>;
  token: TVRMLoginSessionToken;
}
export class VRMLoginLocalStorage implements IVRMLoginStorage {
  token;
  constructor() {
    this.token = this.restoreLogin();
  }
  restoreLogin() {
    const token = localStorage.getItem("_login");
    const fields: TVRMLoginSessionToken = token ? JSON.parse(token) : "";
    return fields;
  }
  saveLogin() {
    localStorage.setItem("_login", JSON.stringify(this.token));
  }
  async login(email: string, password: string) {
    const login = await fetchMock("/api/login", {
      email: email,
      password: password,
    });
    const loginResponse = await login.json();
    switch (loginResponse.message) {
      case TVRMApiLoginMessages.OK:
        if (typeof loginResponse.token !== "string")
          throw new Error("Invalid token");
        this.token = loginResponse.token;
        this.saveLogin();
        break;
      case TVRMApiLoginMessages.ERRORUSER:
        throw new Error("Invalid credentials");
        break;
      case TVRMApiLoginMessages.ERRORPASSWORD:
        throw new Error("Invalid credentials");
        break;
    }
  }
  async isLoggedIn() {
    if (this.token) {
      const login = await fetchMock("/api/token", {
        token: this.token,
      });
      const loginResponse = await login.json();
      if (loginResponse.status) return true;
    }
    return false;
  }
}
