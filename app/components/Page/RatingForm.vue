<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="title">Tulis Ulasan Kamu</div>
    <UForm
      :schema="schema"
      :state="state"
      class="w-full flex flex-col justify-center items-center space-y-4"
      @submit="onSubmit"
    >
      <textarea
        v-model="state.text"
        class="w-full max-w-xl mt-3 p-2 border-2 rounded-lg resize-none text-xs font-bold"
        rows="2"
        placeholder="Tulis ulasan kamu di sini..."
      ></textarea>
      <div>
        <Icon v-for="_ in state.rating" name="ic:baseline-star" class="text-amber-300 text-4xl font-bold my-2" />
      </div>
      <USlider
        v-model="state.rating"
        class="w-46 mb-4"
        :min="1"
        :max="5"
        :step="1"
        :ui="{
          thumb: 'bg-amber-400 ring-none',
          range: 'bg-amber-400 border-2',
        }"
      />
      <UButton
        class="solid-shadow bg-amber-400 px-8"
        type="submit"
        color="warning"
        @click="
          async () => {
            if (!loggedIn) {
              await navigateTo('/api/auth/google', {
                external: true,
              });
            }
          }
        "
      >
        Kirim Ulasan
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { loggedIn } = useUserSession();
const toast = useToast();
const schema = z.object({
  text: z.string().min(1).max(128),
  rating: z.number().min(1).max(5),
});

type Schema = z.output<typeof schema>;
const state = ref<Partial<Schema>>({
  text: "",
  rating: 5,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/rating", {
    method: "POST",
    body: event.data,
  })
    .then(() => {
      toast.add({ title: "Success", description: "Form berhasil dikirimkan", color: "success" });
      reloadWindow();
    })
    .catch((e) => {
      if (e.statusCode == 510) {
        alertStore.text = "Kamu sudah memberi rating";
        alertStore.isOpen = true;
      } else {
        toast.add({ title: "Failure", description: "Form gagal dikirimkan", color: "error" });
      }
    });
}
</script>
