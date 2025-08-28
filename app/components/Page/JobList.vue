<template>
  <div class="flex flex-col gap-5">
    <JobCard @reload-jobs="getJobsData" v-for="job in jobList" :data="job" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const jobList = ref<Array<any>>([]);

onMounted(async () => {
  await getJobsData();
});

async function getJobsData() {
  const data = await $fetch("/api/job");
  jobList.value = data.reverse();
}
</script>
