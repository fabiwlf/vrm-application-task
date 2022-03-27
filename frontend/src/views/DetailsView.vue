<script lang="ts" setup>
import ListItemDialog from "@/components/ListItemDialog.vue";
import type { IVRMListItem } from "../components/ListItem";
import { ref } from "vue";
const items = ref<IVRMListItem[]>([]);
const addEditDialogChild =
  ref<typeof ListItemDialog extends new () => infer T ? T : never>();
const dateFormatter = new Intl.DateTimeFormat("de-DE"); //may need a polyfill with dayjs or similar
</script>
<template>
  <ListItemDialog
    ref="addEditDialogChild"
    @create-item="
      (item) => {
        const existingItem = items.findIndex((findBy) => findBy.id === item.id);
        if (existingItem >= 0) items[existingItem] = item;
        else items.push(item);
      }
    "
  />
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
          <span @click="addEditDialogChild?.editItem(item)">Bearbeiten</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped lang="scss">
table {
  min-width: 900px;
  td {
    padding: 0.75rem;
    vertical-align: top;
  }
  thead {
    tr {
      border-top: none;
      border-bottom: none !important;
      color: #fff;
    }
    th {
      border-top: none;
      border-bottom: none !important;
      color: #fff;
    }
  }
  tbody {
    th {
      color: #777;
      font-weight: 400;
      padding-bottom: 20px;
      padding-top: 20px;
      font-weight: 300;
      small {
        color: #b3b3b3;
        font-weight: 300;
      }
    }
    td {
      color: #777;
      font-weight: 400;
      padding-bottom: 20px;
      padding-top: 20px;
      font-weight: 300;
      small {
        color: #b3b3b3;
        font-weight: 300;
      }
    }
    tr {
      &:not(.spacer) {
        border-radius: 7px;
        overflow: hidden;
        -webkit-transition: 0.3s all ease;
        -o-transition: 0.3s all ease;
        transition: 0.3s all ease;
        &:hover {
          -webkit-box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
        }
      }
      th {
        background: #25252b;
        border: none;
        -webkit-transition: 0.3s all ease;
        -o-transition: 0.3s all ease;
        transition: 0.3s all ease;
        a {
          color: #b3b3b3;
        }
        &:first-child {
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        }
        &:last-child {
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        }
      }
      td {
        background: #25252b;
        border: none;
        -webkit-transition: 0.3s all ease;
        -o-transition: 0.3s all ease;
        transition: 0.3s all ease;
        a {
          color: #b3b3b3;
        }
        &:first-child {
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
        }
        &:last-child {
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
        }
      }
      &:hover {
        th {
          color: #fff;
          background: #2e2e36;
          a {
            color: #fff;
          }
        }
        td {
          color: #fff;
          background: #2e2e36;
          a {
            color: #fff;
          }
        }
      }
    }
    tr.spacer {
      td {
        padding: 0 !important;
        height: 3px;
        border-radius: 0 !important;
        background: transparent !important;
      }
    }
    tr.active {
      th {
        color: #fff;
        background: #2e2e36;
        a {
          color: #fff;
        }
      }
      td {
        color: #fff;
        background: #2e2e36;
        a {
          color: #fff;
        }
      }
    }
  }
}

/* table th:not(:last-child) {
  text-align: left;
}
table tr td {
  word-break: break-all;
} */
.action-column {
  text-align: center;
}
</style>
