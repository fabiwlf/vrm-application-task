import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Login from "../Login.vue";

describe("Login", () => {
  const wrapper = mount(Login, { props: { minlength: 8, maxlength: 255 } });
  it("renders properly", () => {
    expect(wrapper.text()).toContain("Email:");
  });
  it("has wrong login", async () => {
    wrapper.find("form input[type='text']").setValue("test@test.de");
    wrapper.find("form input[type='password']").setValue("testtest");
    wrapper.find("form button[type='submit']").trigger("click");
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(wrapper.find("form span").text()).toContain("Invalid credentials");
  });
  it("can login", async () => {
    wrapper.find("form input[type='text']").setValue("test@test.de");
    wrapper.find("form input[type='password']").setValue("test@test.de");
    wrapper.find("form button[type='submit']").trigger("click");
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(wrapper.emitted()).toHaveProperty("onSuccess");
  });
});
