<script setup lang="ts">
import { ref } from "vue";
import type { IVRMListItem } from "./ListItem";
//define properties for login component

const emit = defineEmits<{
  (e: "createItem", item: IVRMListItem): void;
}>();
class VRMListItemForm {
  item: {
    [K in keyof IVRMListItem]: {
      value: IVRMListItem[K];
      textMaxLength?: number;
      validator(): boolean;
    };
  } = {
    title: {
      value: "",
      textMaxLength: 100,
      validator() {
        return (
          this.value.length > 0 &&
          typeof this.textMaxLength == "number" &&
          this.value.length <= this.textMaxLength
        );
      },
    },
    text: {
      value: "",
      textMaxLength: 300,
      validator() {
        return (
          this.value.length > 0 &&
          typeof this.textMaxLength == "number" &&
          this.value.length <= this.textMaxLength
        );
      },
    },
    date: {
      value: "",
      validator: () => true,
    },
    id: {
      value: 0,
      validator: () => true,
    },
  };

  get isEditMode() {
    return this.item.id.value > 0;
  }

  get serialized(): IVRMListItem {
    if (!this.item.id.value) {
      this.item.id.value = Math.floor(Math.random() * 1000000);
    }
    //could also be done with reduce
    const objectValues = Object.keys(this.item).map((k) => [
      k,
      this.item[k as keyof IVRMListItem].value,
    ]);
    return Object.fromEntries(objectValues);
  }

  clear(): void {
    for (const key in this.item)
      this.item[key as keyof IVRMListItem].value = "";
  }

  /*  new(): void {
    this.clear();
    this.item.id.value++;
  } */
  constructor(/* title: string, text: string, date: string */) {
    /*  this.title.value = title;
    this.text.value = text;
    this.date.value = date; */
  }
}
const listItemForm = ref(new VRMListItemForm()),
  listItem = listItemForm.value.item;
const sendItemToParent = (item: VRMListItemForm) => {
  emit("createItem", item.serialized);
  item.clear();
};
const editItem = (item: IVRMListItem) => {
  for (const key in listItem) {
    listItem[key as keyof IVRMListItem].value = item[key as keyof IVRMListItem];
  }
};
defineExpose({
  editItem,
});
/* return { editItem: () => console.log("editItem") }; */
</script>

<template>
  <main>
    <form @submit.prevent="sendItemToParent(listItemForm)">
      <h1 v-if="listItemForm.isEditMode">Editieren</h1>
      <h1 v-else>Neu</h1>
      <label>
        Titel:
        <input
          type="text"
          v-model="listItem.title.value"
          :maxlength="listItem.text.textMaxLength"
          placeholder="Titel"
          required
        />
      </label>
      <label>
        Text:
        <textarea
          v-model="listItem.text.value"
          placeholder="Text"
          rows="5"
          :maxlength="listItem.text.textMaxLength"
        ></textarea>
        <span
          >{{ listItem.text.value.length }} /
          {{ listItem.text.textMaxLength }}</span
        >
      </label>
      <label>
        Datum:
        <input
          type="date"
          v-model="listItem.date.value"
          placeholder="Date"
          required
        />
      </label>
      <button type="submit">Speichern</button>
      <button
        type="button"
        v-show="listItemForm.isEditMode"
        @click="listItemForm.clear()"
      >
        Abbrechen
      </button>
    </form>
  </main>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

label {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid hsla(160, 100%, 37%, 0.5);
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid hsla(160, 100%, 37%, 0.5);
}
</style>
