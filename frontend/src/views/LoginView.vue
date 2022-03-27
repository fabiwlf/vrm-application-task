<script setup lang="ts">
import Login from "@/components/Login.vue";
</script>

<template>
  <main>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div
          class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 signup-form"
        >
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
            Login
          </h2>

          <Login
            :minlength="8"
            :maxlength="255"
            @on-success="$router.push('/details')"
          />

          <p class="text-xs text-gray-500 mt-3">
            
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
