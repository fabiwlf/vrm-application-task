<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
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
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.css";
:root {
  --color-shades-gray: #585b63;
  --color-shades-dim: #202124;
  --color-core-text: #fff;
  --color-core-bg: var(--color-shades-dim);
  --color-stroke: var(--color-shades-gray);
}
body {
  /* background: var(--color-core-bg); */
  color: var(--color-core-text);
}
#app {
  max-width: 1280px;
  margin: 0 auto;
  /* padding: 2rem; */

  font-weight: normal;
  display: grid;
  grid-template-rows: auto 1fr auto;
  > * {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  main {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  /* margin-top: 2rem; */
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;

  padding: 1rem 0;
  border-bottom: 1px solid var(--color-stroke);
  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    &:first-of-type {
      border: 0;
    }
    &.router-link-exact-active {
      color: var(--color-text);
      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
