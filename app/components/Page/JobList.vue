<template>
  <div class="flex flex-col gap-5">
    <JobCard v-for="job in jobList" :data="job" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const jobList = ref<Array<any>>([]);
onMounted(async () => {
  await $fetch("/api/job").then((res) => {
    for (const data of res) {
      jobList.value.push(data);
    }
  });
});
</script>
