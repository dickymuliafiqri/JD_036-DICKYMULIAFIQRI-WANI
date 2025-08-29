<template>
  <button
    class="w-max"
    @click="
      () => {
        if (exec != undefined) exec();
      }
    "
  >
    <div :class="innerClass" class="rounded-xl border-2 text-black p-2 shadow-solid-md title"><slot></slot></div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  innerClass: String,
  exec: Function,
});
</script>
