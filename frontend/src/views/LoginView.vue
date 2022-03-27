<script setup lang="ts">
import Login from "@/components/Login.vue";
</script>

<template>
  <main>
    <Login
      :minlength="8"
      :maxlength="255"
      @on-success="$router.push('/details')"
    />
  </main>
</template>
