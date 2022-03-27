<script setup lang="ts">
import { ref } from "vue";
import { VRMLogin } from "../router";
//define properties for login component
const props = defineProps<{
  minlength: number;
  maxlength: number;
}>();
const emit = defineEmits<{
  (e: "onSuccess"): void;
}>();

class VRMLoginUI {
  email = "test@test.de";
  password = "test@test.de";
  error = "";
  async onSubmit() {
    try {
      await VRMLogin.login(this.email, this.password);
      emit("onSuccess");
    } catch (e) {
      if (e instanceof Error) this.error = e.message;
    }
  }
}
const login = ref(new VRMLoginUI());
/* export default VRMLogin; */
</script>

<template>
  <main>
    <form @submit.prevent="login.onSubmit">
      <h1>Login</h1>
      <label>
        Email:
        <input
          type="text"
          v-model="login.email"
          placeholder="Username"
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
      <span>{{ login.error }}</span>
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

form {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: min(100%, 400px);
  margin: auto;
}
</style>
