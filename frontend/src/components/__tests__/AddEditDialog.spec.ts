import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AddEditDialog from "../AddEditDialog.vue";

describe("AddEditDialog", () => {
  const wrapper = mount(AddEditDialog, {
    props: {},
  });
  it("renders properly", () => {
    expect(wrapper.text()).toContain("Titel:");
  });
  const item = {
    title: "unittest",
    text: "text",
    date: new Date().toISOString().split("T")[0],
  };
  it("can login", async () => {
    wrapper.find("form input[type='text']").setValue(item.title);
    wrapper.find("form textarea").setValue(item.text);
    wrapper.find("form input[type='date']").setValue(item.date);
    wrapper.find("form button[type='submit']").trigger("click");
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(wrapper.emitted()).toHaveProperty("createItem");
  });
  it("has correct item", async () => {
    const [emittedArray] = wrapper.emitted().createItem;
    if (
      typeof emittedArray === "object" &&
      Array.isArray(emittedArray) &&
      emittedArray.length === 1
    ) {
      const [emittedItem] = emittedArray;
      if ("title" in emittedItem) expect(emittedItem.title).toBe(item.title);
      if ("text" in emittedItem) expect(emittedItem.text).toBe(item.text);
      if ("date" in emittedItem) expect(emittedItem.date).toBe(item.date);
    }
  });
});
