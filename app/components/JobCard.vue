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
          <div class="title text-xl">
            <div v-if="!isEdit">
              {{ data.jobs_table.title }}
            </div>
            <div v-else>
              <UInput v-model="data.jobs_table.title"></UInput>
            </div>
          </div>
          <div class="text-sm">
            <div>Category : {{ data.jobs_table.category }}</div>
            <div>
              Posted by <span class="font-bold"> {{ data.users_table.name }}</span>
            </div>
          </div>
        </div>
        <div class="bg-white p-2 rounded-xl mt-2 font-bold text-xs">
          <div v-if="!isEdit">
            {{ data.jobs_table.desc }}
          </div>
          <div v-else>
            <UTextarea v-model="data.jobs_table.desc" :maxrows="2" class="w-full"></UTextarea>
          </div>
        </div>
        <div class="flex justify-between text-white mt-2">
          <div class="w-full flex justify-between">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1">
                <Icon name="ic:outline-location-on" />
                <div class="text-xs font-bold">{{ (data.users_table.location as string).split("_")[2] }}</div>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="ic:round-money" />
                <div class="text-xs font-bold flex w-full items-center gap-2">
                  <span> Rp. </span>
                  <div v-if="!isEdit">
                    {{ data.jobs_table.offers }}
                  </div>
                  <div v-else class="flex w-38">
                    <UInputNumber v-model="data.jobs_table.offers" :min="10000" :step="2000" size="xs" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <UButton v-if="!isEdit" class="solid-shadow bg-amber-400 px-8" @click="showJob" color="warning"
                >WANI!</UButton
              >
              <UButton v-else class="solid-shadow bg-emerald-400" @click="updateJob(data.jobs_table.id)" color="success"
                >Simpan</UButton
              >
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
const isEdit = ref(false);

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
  isEdit.value = true;
}

async function updateJob(id: string) {
  await $fetch("/api/job/" + id, {
    method: "PATCH",
    body: JSON.stringify(props.data.jobs_table),
  }).finally(() => {
    isEdit.value = false;
  });
}

async function deleteJob(id: string) {
  await $fetch("/api/job/" + id, {
    method: "DELETE",
  }).then(async () => {
    await jobsStore.getJobList();
  });
}
</script>
