<template>
  <UContainer>
    <div class="w-full flex justify-center">
      <UAvatar :src="user?.picture" :alt="user?.name" size="3xl" class="shadow" />
    </div>
    <div class="w-full flex justify-center mt-5">
      <div>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Nama" name="name">
            <UInput :placeholder="user?.name" disabled />
          </UFormField>

          <UFormField label="Email" name="email">
            <UInput :placeholder="user?.email" disabled />
          </UFormField>

          <UFormField label="No. HP" name="phone">
            <UInput v-model="state.phone" type="number">
              <template #leading>
                <p class="text-sm text-muted">+62</p>
              </template>
            </UInput>
          </UFormField>

          <UButton type="submit"> Submit </UButton>
        </UForm>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { user } = useUserSession();

const schema = z.object({
  phone: z.number().min(10, "Minimal 10 digit"),
});

type Schema = z.output<typeof schema>;
const state = ref<Partial<Schema>>({
  phone: 0,
});

onMounted(async () => {
  await $fetch("/api/user").then((res) => {
    state.value.phone = parseInt(res[0]?.phone as string) || 0;
  });
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/user/" + user.value?.sub, {
    method: "PATCH",
    body: event.data,
  })
    .then(() => {
      toast.add({ title: "Success", description: "Data berhasil disimpan", color: "success" });
    })
    .catch(() => {
      toast.add({ title: "Failure", description: "Data gagal disimpan", color: "error" });
    });
}
</script>
