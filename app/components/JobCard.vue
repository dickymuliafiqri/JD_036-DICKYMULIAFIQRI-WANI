<template>
  <div class="w-full p-2 rounded-2xl border-2 shadow-solid-md bg-raka-red-20">
    <div class="flex gap-3">
      <div>
        <UAvatar :src="data.users_table.avatar"></UAvatar>
      </div>
      <div class="w-full">
        <div class="text-white">
          <div class="title text-xl">{{ data.jobs_table.title }}</div>
          <div class="-mt-1">
            <div>Category : {{ data.jobs_table.category }}</div>
            <div class="-mt-2">
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
                <div class="text-xs font-bold">{{ data.jobs_table.location }}</div>
              </div>
              <div class="flex gap-1">
                <Icon name="ic:round-money" />
                <div class="text-xs font-bold">Rp. {{ data.jobs_table.offers }}</div>
              </div>
            </div>
            <div>
              <SolidShadowButton text="WANI!" inner-class="bg-amber-400 px-8" :exec="showJob" />
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

async function showJob() {
  window.alert("Nanti diarahin ke " + props.data.users_table.name);
}
</script>
