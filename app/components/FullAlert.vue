<template>
  <div class="min-w-screen min-h-screen fixed flex justify-center items-center z-50">
    <UContainer>
      <div class="w-full h-max bg-white flex flex-col justify-center items-center rounded-2xl p-4 border-2">
        <div class="title text-2xl">Informasi</div>
        <div class="my-3">
          <slot></slot>
        </div>
        <SolidShadowButton text="OK!" inner-class="bg-raka-red-20 mt-3 px-4" :exec="closeAlert"></SolidShadowButton>
      </div>
    </UContainer>
  </div>
  <div class="min-w-screen min-h-screen bg-black/50 fixed z-40"></div>
</template>

<script setup lang="ts">
async function closeAlert() {
  await alertStore.exec();
  alertStore.clear();
}
</script>
