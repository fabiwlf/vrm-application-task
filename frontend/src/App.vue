<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { VRMLogin } from "./router";
</script>

<template>
  <header class="body-font">
    <div>
      <a class="title-font">
        <span>VRM-Aufgabe</span>
      </a>
      <nav>
        <RouterLink to="/details">Home</RouterLink>
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
@import "@/assets/tw.scss";
</style>
