<template>
  <div class="rounded-full w-max h-max bg-white border-2 p-2">
    <div class="flex justify-center items-center gap-2">
      <input type="text" placeholder="coba 'kasih makan kucing'" v-model="state.searchText" />
      <div class="bg-raka-blue-20 rounded-full p-2 flex justify-center">
        <Icon class="text-black" name="ic:baseline-search"></Icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref({
  searchText: "",
});
</script>
