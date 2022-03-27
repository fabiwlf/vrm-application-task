<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { VRMLogin } from "./router";
</script>

<template>
  <header>
    <!-- <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    /> -->

    <nav>
      <RouterLink to="/details">Home</RouterLink>
      <a
        @click.prevent="
          () => {
            VRMLogin.clearLogin();
            $router.push('/login');
          }
        "
        v-if="$route.meta?.isLoggedIn"
        >Logout</a
      >
      <RouterLink to="/login" v-else>Login</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";

</style>
