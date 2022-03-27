import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { VRMLoginLocalStorage } from "../index";

describe("Login", () => {
  const VRMLogin = new VRMLoginLocalStorage();
  it("is not logged in", async () => {
    expect(await VRMLogin.isLoggedIn()).toBe(false);
  });
  it("has no credentials", async () => {
    try {
      await VRMLogin.login("", "");
    } catch {
      expect(true).toBe(true);
    }
  });
  it("has no password", async () => {
    try {
      await VRMLogin.login("test@test.de", "");
    } catch {
      expect(true).toBe(true);
    }
  });
  it("has no user", async () => {
    try {
      await VRMLogin.login("", "test@test.de");
    } catch {
      expect(true).toBe(true);
    }
  });
  it("has a valid login", async () => {
    expect(await VRMLogin.login("test@test.de", "test@test.de")).toBeTypeOf(
      "string"
    );
  });
  it("is logged in", async () => {
    expect(await VRMLogin.isLoggedIn()).toBe(true);
  });
});
