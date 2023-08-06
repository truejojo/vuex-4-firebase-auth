<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");
const error = ref("");

const handleSubmit = async () => {
  try {
    await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <label for="email">Password:</label>
    <input type="password" name="password" v-model="password" required />

    <button>Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>
