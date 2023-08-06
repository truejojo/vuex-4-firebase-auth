<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const logout = async () => {
  await store.dispatch("logout");
};
const authIsReady = computed(() => store.state.authIsReady);
const user = computed(() => store.state.user);
</script>

<template>
  <nav>
    <h1>Vuex Auth</h1>
    <!-- for all users -->
    <template v-if="authIsReady">
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <!-- for logged in users -->
      <div v-if="user">
        <span>Logged in as {{ user.email }}</span>
        <button @click="logout">Logout</button>
      </div>
      <!-- for logged out users -->
      <div v-if="!user">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </template>
  </nav>
</template>
