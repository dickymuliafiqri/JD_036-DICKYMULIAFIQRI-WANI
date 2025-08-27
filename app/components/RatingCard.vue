<template>
  <div class="w-full p-4 rounded-2xl border-2 bg-raka-red-20">
    <div class="flex flex-col justify-center items-center gap-2">
      <UAvatar :src="data.users_table.avatar" :alt="data.users_table.name"></UAvatar>
      <div class="title text-xl text-white">{{ data.users_table.name }}</div>
      <div class="text-amber-300 text-2xl -my-1">
        <Icon v-for="n in data.ratings_table.rating" name="ic:baseline-star" />
      </div>
      <div class="rounded-2xl flex justify-center items-center bg-white w-full h-max p-2 text-xs font-bold">
        {{ data.ratings_table.review }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: null,
});
</script>
