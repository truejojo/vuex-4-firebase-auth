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
  <nav
    v-if="authIsReady"
    class="navbar navbar-expand-lg d-flex justify-content-between"
  >
    <RouterLink class="navbar-brand" to="/">Home</RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/destinations">
            Destinations
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/dashboard">Dashboard</RouterLink>
        </li>
        <li v-if="!user" class="nav-item">
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
        </li>
        <li v-if="user" class="nav-item">
          <button @click="logout" class="nav-link">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>
