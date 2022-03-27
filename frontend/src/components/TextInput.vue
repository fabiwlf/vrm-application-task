<script setup lang="ts">
defineProps<{
  listItem: { value: unknown; textMaxLength?: number; validator?(): boolean };
  type: "text" | "textarea" | "date";
}>();
</script>
<template>
  <label>
    Titel:
    <component
      :is="type == 'textarea' ? 'textarea' : 'input'"
      type="text"
      v-model="listItem.value"
      :maxlength="listItem.textMaxLength"
      placeholder="Titel"
      required
    />
  </label>
</template>
