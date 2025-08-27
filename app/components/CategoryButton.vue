<template>
  <div
    class="w-24 h-24 border-2 border-black text-white bg-raka-red-20 rounded-2xl flex flex-col justify-center items-center"
    @click="
      () => {
        if (exec != undefined) exec();
      }
    "
  >
    <div>
      <Icon :name="icon as string" class="text-5xl"></Icon>
    </div>
    <div class="font-medium text-sm -mt-2">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  name: String,
  exec: Function,
});
</script>
