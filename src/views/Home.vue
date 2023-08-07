<script setup>
import { computed } from "vue";
import { useStore } from "vuex";



const store = useStore();

const user = computed(() => store.state.user);
</script>

<template>
  <h1 class="text-uppercase">Homepage</h1>
  <h2 v-if="user">Welcome back, {{ user.email }}</h2>
</template>