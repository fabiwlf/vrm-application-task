import { createMockApp } from "./MockApp";
//for unittest use dynamic imported crypto library
const crypto = self.crypto || (await import("crypto"));
export enum TVRMApiLoginMessages {
  OK = "OK",
  ERRORPASSWORD = "ERRORPASSWORD",
  ERRORUSER = "ERRORUSER",
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
const mockApp = createMockApp<TVRMApi>();
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
const addToken = (email: string) => {
  const token = crypto.randomUUID();
  demoTokens.set(token, { email: email });
  localStorage.setItem("_serverTokens", JSON.stringify(Array.from(demoTokens)));
  return token;
};
mockApp.post("/api/login", async ({ request }) => {
  const demoUser = demoUsers.get(request.email);
  if (demoUser) {
    if ((await digestMessage(request.password)) === demoUser.passwordHash) {
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
mockApp.post("/api/token", async ({ request }) => {
  const demoToken = demoTokens.get(request.token);
  if (demoToken) {
    return { status: true };
  }
  return { status: false };
});
export const fetchMock = mockApp.call;
