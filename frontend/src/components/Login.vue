<script setup lang="ts">
import { ref } from "vue";
import { VRMLogin } from "../router";
//define properties for login component
defineProps<{
  minlength: number;
  maxlength: number;
}>();
// emit login
const emit = defineEmits<{
  (e: "onSuccess", token: string): void;
}>();

class VRMLoginUI {
  email = "test@test.de";
  password = "test@test.de";
  error = "";
  async onSubmit() {
    try {
      this.error = "";
      emit("onSuccess", await VRMLogin.login(this.email, this.password));
    } catch (e) {
      if (e instanceof Error) this.error = e.message;
    }
  }
}
const login = ref(new VRMLoginUI());
</script>
<template>
  <main>
    <form @submit.prevent="login.onSubmit">
      <!--   <h1>Login</h1> -->
      <label>
        Email:
        <input
          type="email"
          v-model="login.email"
          placeholder="Email"
          required
        />
      </label>
      <label>
        Passwort:
        <input
          type="password"
          v-model="login.password"
          placeholder="Password"
          :minlength="minlength"
          :maxlength="maxlength"
          required
        />
      </label>
      <span v-if="login.error">{{ login.error }}</span>
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<style>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}
</style>
