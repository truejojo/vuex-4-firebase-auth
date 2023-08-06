<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const blogs = ref([
  { title: "Why Coffee is Better than Tea", id: 1 },
  { title: "...Then I Took an Arrow in the Knee", id: 2 },
  { title: "Mario vs Luigi, Ultimate Showdown", id: 3 },
]);

const user = computed(() => store.state.user);
</script>

<template>
  <div class="home">
    <div v-for="blog in blogs" :key="blog.id">
      <div class="blog">
        <h3>{{ blog.title }}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          aspernatur consectetur doloremque sunt ducimus enim iure animi fugit
          nulla et! Perferendis autem deleniti quo eum corrupti reiciendis
          voluptatem ab ducimus?
        </p>
        <div v-if="user" class="icons">
          <span><strong>upvote or downvote this article: </strong></span>
          <span class="material-icons">thumb_up</span>
          <span class="material-icons">thumb_down</span>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
const points = computed(() => store.state.points);
const updatePoints = (points) => store.commit('updatePoints', points)
    <h1>Points: {{ points }}</h1>
    <button @click="updatePoints(1)">more points...</button>
    <button @click="updatePoints(-1)">less points...</button>
-->
