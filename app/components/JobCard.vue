<template>
  <div class="w-full p-4 rounded-2xl border-2 shadow-solid-md bg-raka-red-20">
    <div class="flex gap-3">
      <div>
        <UAvatar :src="data.users_table.avatar" :alt="data.users_table.name"></UAvatar>
        <div
          v-if="data.users_table.id == user?.sub"
          class="h-max flex flex-col gap-3 py-2 justify-center items-center rounded-full my-3 text-white"
        >
          <div @click="editJob">
            <Icon name="ic:baseline-edit"></Icon>
          </div>
          <div @click="deleteJob(data.jobs_table.id)">
            <Icon name="ic:baseline-delete-forever"></Icon>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="text-white">
          <div class="title text-xl">{{ data.jobs_table.title }}</div>
          <div class="text-sm">
            <div>Category : {{ data.jobs_table.category }}</div>
            <div>
              Posted by <span class="font-bold"> {{ data.users_table.name }}</span>
            </div>
          </div>
        </div>
        <div class="bg-white p-2 rounded-xl mt-2 font-bold text-xs">
          {{ data.jobs_table.desc }}
        </div>
        <div class="flex justify-between text-white mt-2">
          <div class="w-full flex justify-between">
            <div class="flex flex-col gap-1">
              <div class="flex gap-1">
                <Icon name="ic:outline-location-on" />
                <div class="text-xs font-bold">{{ (data.users_table.location as string).split("_")[2] }}</div>
              </div>
              <div class="flex gap-1">
                <Icon name="ic:round-money" />
                <div class="text-xs font-bold">Rp. {{ data.jobs_table.offers }}</div>
              </div>
            </div>
            <div>
              <UButton class="solid-shadow bg-amber-400 px-8" @click="showJob" color="warning">WANI!</UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: null,
});

const { user } = useUserSession();

async function showJob() {
  await navigateTo(
    `https://wa.me/62${parseInt(
      props.data.users_table.phone
    )}?text=Halo saya mau apply job, tolong klik tautan berikut.\nhttp://localhost:3000/api/job/${
      props.data.jobs_table.id
    }`,
    {
      external: true,
    }
  );
}

async function editJob() {
  // Edit job
}

async function deleteJob(id: number) {
  console.log(id);
  await $fetch("/api/job/" + id, {
    method: "DELETE",
  }).then(async () => {
    await jobsStore.getJobList();
  });
}
</script>
