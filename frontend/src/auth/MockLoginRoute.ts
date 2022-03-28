import { createMockApp } from "../helpers/MockApp";
// for unittest use dynamic imported crypto library, jsdom doesn't have it
const crypto = self.crypto ?? (await import("crypto"));
export enum TVRMApiLoginMessages {
  OK,
  ERRORPASSWORD,
  ERRORUSER,
}
type TVRMApi = {
  login: {
    request: {
      email: string;
      password: string;
    };
    response: {
      token?: string;
      message?: TVRMApiLoginMessages;
    };
  };
  token: {
    request: {
      token: string;
    };
    response: {
      status: boolean;
    };
  };
};
// create mock server
const mockApp = createMockApp<TVRMApi>();
// returns a salted sha256 hash
async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message + "SALT"); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
//define set of demo users
const demoUsers = new Map<string, { passwordHash: string }>();
demoUsers.set("test@test.de", {
  passwordHash: await digestMessage("test@test.de"),
});
//define set of demo tokens
const activeTokens = localStorage.getItem("_serverTokens"),
  demoTokens = new Map<string, { email: string }>(
    activeTokens ? JSON.parse(activeTokens) : []
  );
// define login route
mockApp.post("/api/login", async ({ request }) => {
  const demoUser = demoUsers.get(request.email);
  if (demoUser) {
    if ((await digestMessage(request.password)) === demoUser.passwordHash) {
      const addToken = (email: string) => {
        const token = crypto.randomUUID();
        demoTokens.set(token, { email: email });
        localStorage.setItem(
          "_serverTokens",
          JSON.stringify(Array.from(demoTokens))
        );
        return token;
      };
      const token = addToken(request.email);
      return {
        token: token,
        message: TVRMApiLoginMessages.OK,
      };
    } else {
      return { message: TVRMApiLoginMessages.ERRORPASSWORD };
    }
  }
  return { message: TVRMApiLoginMessages.ERRORUSER };
});
// define token check route, can be used to check if token is valid and to get user email for instance
mockApp.post("/api/token", ({ request }) => {
  const demoToken = demoTokens.get(request.token);
  if (demoToken) {
    return { status: true };
  }
  return { status: false };
});
export const fetchMock = mockApp.call;
