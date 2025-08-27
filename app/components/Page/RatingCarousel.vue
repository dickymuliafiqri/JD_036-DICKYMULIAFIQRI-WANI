<template>
  <UCarousel v-slot="{ item }" :items="ratingList" autoplay auto-scroll loop>
    <RatingCard :data="item" />
  </UCarousel>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ratingList = ref<Array<any>>([]);
onMounted(async () => {
  await $fetch("/api/rating").then((res) => {
    for (const data of res) {
      ratingList.value.push(data);
    }
  });
});
</script>
