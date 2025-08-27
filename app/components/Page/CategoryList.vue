<template>
  <div class="w-96 flex flex-wrap justify-between gap-5">
    <CategoryButton v-for="cat in categoryList" :icon="cat.icon" :name="cat.name" :exec="cat.exec" />
  </div>
</template>

<script setup lang="ts">
const categoryList = ref([
  {
    icon: "ic:baseline-construction",
    name: "Utilitas",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:outline-home",
    name: "Servis",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-grass",
    name: "Kebun",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-add-reaction",
    name: "Komunitas",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-pets",
    name: "Pet Care",
    exec: () => {
      window.alert("Halo");
    },
  },
  {
    icon: "ic:baseline-loop",
    name: "Lainnya",
    exec: () => {
      window.alert("Halo");
    },
  },
]);
</script>
