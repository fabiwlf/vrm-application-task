<script lang="ts" setup>
import ListItemDialog from "@/components/ListItemDialog.vue";
import type { IVRMListItem } from "../components/ListItem";
import { ref } from "vue";
const items = ref<IVRMListItem[]>([]);
const listItemDialogChild =
  ref<typeof ListItemDialog extends new () => infer T ? T : never>();
const dateFormatter = new Intl.DateTimeFormat("de-DE"); //may needs polyfilling with dayjs or similiar on browsers pre < 2020
</script>
<template>
  <div>
    <ListItemDialog
      ref="listItemDialogChild"
      @create-item="
        (item) => {
          //could also be done with provide / inject, model update or prop + sync
          items.push(item); //add new item
        }
      "
      @update-item="
        (item) => {
          //separated add / update, because it is also used for create
          const existingItem = items.findIndex(
            (findBy) => findBy.id === item.id
          );
          items[existingItem] = item; //update existing item
        }
      "
    />
    <div class="table-list">
      <table v-if="items.length">
        <thead>
          <tr>
            <th>#</th>
            <th>Titel</th>
            <th>Text</th>
            <th>Datum</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" v-bind:key="item.id">
            <td>{{ index }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.text }}</td>
            <td>{{ dateFormatter.format(new Date(item.date)) }}</td>
            <td class="action-column">
              <span @click="listItemDialogChild?.editItem(item)"
                >Bearbeiten</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="scss">
.table-list {
  @apply relative overflow-x-auto shadow-md  mt-6 lg:w-3/4 mx-auto;
  > table {
    @apply w-full text-sm text-left text-gray-500 table-auto; //dark:text-gray-400
    th,
    td {
      @apply md:px-6 px-3 py-3;
    }
    thead {
      @apply text-xs text-gray-700 uppercase bg-gray-50; //dark:bg-gray-700 dark:text-gray-400
    }
    tbody {
      tr {
        @apply bg-white border-b; //dark:bg-gray-800 dark:border-gray-700
      }
      td {
        word-break: break-all;
      }
    }
    a {
      @apply bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base cursor-pointer;
    }
  }
}
.action-column span {
  @apply cursor-pointer;
}
.button-box {
  @apply flex justify-center;
  button {
    @apply mx-2;
  }
}
.list-item-dialog {
  @apply lg:w-2/3 md:w-10/12 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full lg:mt-10 md:mt-0 relative z-10 shadow-md mx-auto;
}
</style>
