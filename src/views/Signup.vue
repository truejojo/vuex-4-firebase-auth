<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const email = ref("");
const password = ref("");
const error = ref("");

const handleSubmit = async () => {
  try {
    await store.dispatch("signup", {
      email: email.value,
      password: password.value,
    });
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="row">
    <h1 class="mb-5">Sign up</h1>

    <div class="mb-3 col-md-8">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        name="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="email"
        required
      />
      <p id="emailHelp" class="form-text">
        We'll never share your email with anyone else.
      </p>
    </div>

    <div class="mb-3 col-md-8">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        name="password"
        class="form-control"
        id="password"
        v-model="password"
        required
      />
    </div>

    <p class="form-text">
      You already have an account?
      <RouterLink to="/login">go back to login</RouterLink>
    </p>
    <div class="col-12">
      <button class="btn btn-primary">Sign up</button>
    </div>
    <p v-if="error">{{ error }}</p>
  </form>
</template>
