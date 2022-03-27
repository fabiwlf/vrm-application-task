<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { VRMLogin } from "./router";
</script>

<template>
  <header class="text-gray-600 body-font border-b-2">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <a
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <!--  <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg> -->
        <span class="ml-3 text-xl">VRM-Aufgabe</span>
      </a>
      <nav
        class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center"
      >
        <RouterLink to="/details" class="mr-5 hover:text-gray-900"
          >Home</RouterLink
        >
        <!--   <a class="mr-5 hover:text-gray-900">First Link</a>
        <a class="mr-5 hover:text-gray-900">Second Link</a>
        <a class="mr-5 hover:text-gray-900">Third Link</a>
        <a class="mr-5 hover:text-gray-900">Fourth Link</a> -->
      </nav>

      <a
        class="router-link"
        @click.prevent="
          () => {
            VRMLogin.clearLogin();
            $router.push('/login');
          }
        "
        v-if="$route.meta?.isLoggedIn"
        >Logout</a
      >
      <RouterLink class="router-link" to="/login" v-else>Login</RouterLink>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
/* @import "@/assets/base.scss"; */
@import "@/assets/tw.css";
#app {
  @apply min-h-screen flex flex-col;
  main {
    @apply md:my-auto;
  }
}
.router-link {
  @apply inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 cursor-pointer;
}
.signup-form form,
.list-item-dialog {
  label {
    @apply leading-7 text-sm text-gray-600;
  }
  input,
  textarea {
    @apply w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out;
  }
  button {
    @apply text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-6;
  }
}
</style>
