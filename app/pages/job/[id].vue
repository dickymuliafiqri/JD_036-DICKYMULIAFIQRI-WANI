<template>
  <UContainer>
    <div class="flex flex-col w-full h-max">
      JOB ID: {{ jobID }}
      <div v-if="user?.sub == job.users_table?.id">
        <div>
          <UButton class="solid-shadow bg-raka-red-20" color="error" @click="deleteJob">Hapus Pekerjaan</UButton>
        </div>
      </div>
      <div v-else>
        <div>
          <UButton class="solid-shadow" @click="applyJob">Ambil Pekerjaan</UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { user } = useUserSession();
const route = useRoute();
const jobID = route.params.id as string;
const job = ref<any>({});

onMounted(async () => {
  const data = (await $fetch("/api/job/" + jobID)) as any;
  job.value = data[0];
});

async function applyJob() {
  const text = `
Halo, saya ingin menerima pekerjaan *${job.value.jobs_table.title}*.

Tolong klik tautan berikut untuk konfirmasi:
https://wani.nuxt.dev/job/${job.value.jobs_table.id}?applier=${user.value?.sub}`;
  await navigateTo(`https://wa.me/62${parseInt(job.value.users_table.phone)}?text=${encodeURI(text)}`, {
    external: true,
  });
}

async function deleteJob() {
  await $fetch("/api/job/" + job.value.jobs_table.id, {
    method: "DELETE",
  }).finally(async () => {
    await navigateTo("/dashboard");
  });
}
</script>
