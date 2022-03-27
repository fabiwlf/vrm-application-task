<script setup lang="ts">
import { ref } from "vue";
import type { IVRMListItem } from "./ListItem";
import { VRMListItemForm } from "./ListItem";
import TextInput from "./TextInput.vue";

//define properties for login component
const emit = defineEmits<{
  (e: "createItem", item: IVRMListItem): void;
}>();
const listItemForm = ref(new VRMListItemForm()),
  listItem = listItemForm.value.item;

const saveItem = (form: VRMListItemForm) => {
    emit("createItem", form.get);
    form.clear();
  },
  editItem = (item: IVRMListItem) => listItemForm.value.assign(item);
defineExpose({
  editItem,
});
/* return { editItem: () => console.log("editItem") }; */
</script>

<template>
  <main>
    <form @submit.prevent="saveItem(listItemForm)">
      <h1 v-if="listItemForm.isEditMode">Editieren</h1>
      <h1 v-else>Neu</h1>
      <!-- <TextInput v-model="listItem.title" type="text"></TextInput> -->
      <label>
        Titel:
        <input
          type="text"
          v-model="listItem.title.value"
          :maxlength="listItem.title.textMaxLength"
          placeholder="Titel"
          required
        />
        <span>{{ listItem.title.validator?.() }}</span></label
      >
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
</style>
