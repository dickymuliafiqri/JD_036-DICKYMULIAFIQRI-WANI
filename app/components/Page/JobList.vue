<template>
  <div class="flex flex-col gap-5">
    <JobCard v-for="job in jobsStore.fullList" :data="job" />
  </div>
</template>

<script setup lang="ts">
onMounted(async () => {
  await jobsStore.getJobList();
});
</script>
