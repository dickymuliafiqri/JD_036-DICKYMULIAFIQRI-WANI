<template>
  <UContainer>
    <div class="w-full flex justify-center">
      <UAvatar :src="user?.picture" :alt="user?.name" size="3xl" class="shadow" />
    </div>
    <div class="w-full flex justify-center mt-5">
      <div>
        <UForm :schema="schema" :state="state" class="space-y-4 w-64 flex flex-col" @submit="onSubmit">
          <UFormField label="Foto KTP" name="ktp">
            <UFileUpload />
          </UFormField>

          <UFormField label="Nama" name="name">
            <UInput :placeholder="user?.name" disabled />
          </UFormField>

          <UFormField label="Tentang Kamu" name="about">
            <UTextarea v-model="state.about" :maxrows="4" />
          </UFormField>

          <UFormField label="Keahlian Khusus" name="speciality">
            <UInputTags v-model="state.speciality" />
          </UFormField>

          <UFormField label="Email" name="email">
            <UInput :placeholder="user?.email" disabled />
          </UFormField>

          <!-- <UFormField label="NIK" name="nik">
            <UInput :placeholder="state.nik?.toString()" disabled />
          </UFormField> -->

          <UFormField label="Lokasi" name="location">
            <UInput v-model="state.location" />
          </UFormField>

          <UFormField label="No. HP" name="phone">
            <UInput v-model="state.phone" type="number">
              <template #leading>
                <p class="text-sm text-muted">+62</p>
              </template>
            </UInput>
          </UFormField>

          <UButton type="submit" class="mt-3"> Submit </UButton>
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
  //   ktp: z.file(),
  phone: z.number().min(10, "Minimal 10 digit"),
  //   nik: z.number().min(16).max(16),
  location: z.string().min(2, "Minimal 2 karakter"),
  about: z.string().min(16, "Minimal 16 karakter"),
  speciality: z.array(z.string()),
});

type Schema = z.output<typeof schema>;
const state = ref<Partial<Schema>>({
  //   ktp: undefined,
  phone: 0,
  //   nik: 0,
  location: "",
  about: "",
  speciality: [],
});

onMounted(async () => {
  await $fetch("/api/user").then((res) => {
    state.value = {
      ...state.value,
      phone: parseInt(res[0]?.phone as string) || 0,
      //   nik: parseInt(res[0]?.nik as unknown as string) || 0,
      location: res[0]?.location as string,
      about: res[0]?.about as string,
      speciality: (res[0]?.speciality as string).split(","),
    };
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
