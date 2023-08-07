<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("fetchAllDestinations");
const destinations = computed(() => store.state.destinations);
const user = computed(() => store.state.user);
</script>

<template>
  <section class="row g-4">
    <h1 class="mb-5 col-12">Destinations</h1>

    <div class="col-12 col-lg-6" v-for="destination in destinations">
      <div class="card h-100">
        <img
          class="card-img-top"
          :src="`/images/${destination.image}`"
          :alt="destination.name"
        />
        <div class="card-body">
          <h2 class="card-title">{{ destination.name }}</h2>
          <p class="card-text">{{ destination.description }}</p>
        </div>
        <div v-if="user" class="card-footer text-center">
          <a href="#" class="btn btn-info"
            >Read more about {{ destination.name }}</a
          >
        </div>
      </div>
    </div>
  </section>
</template>
