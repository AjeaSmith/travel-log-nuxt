<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { InsertLocation } from "~~/lib/db/schema/location";

import FormField from "~/components/form-field.vue";
import SubmitError from "~/components/submit-error.vue";

const { $csrfFetch } = useNuxtApp();

const submitError = ref<string | undefined>("");
const submitted = ref(false);
const loading = ref(false);

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const router = useRouter();

// checks if user wants to leave on unsaved changes
onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? changes will be lost");

    if (!confirm)
      return false;
  }
  return true;
});
const onSubmit = handleSubmit(async (values) => {
  // sumbit data to backend (API)
  try {
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage;
    loading.value = false;
  }
});
</script>

<template>
  <section class="container max-w-md mx-auto p-4">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <SubmitError :error="submitError" />
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <FormField
        name="name"
        label="Name"
        :error="errors.name"
        :disabled="loading"
      />

      <FormField
        name="description"
        type="textarea"
        label="Description"
        :error="errors.description"
        :disabled="loading"
      />

      <FormField
        type="number"
        name="lat"
        label="Latitude"
        :error="errors.lat"
        :disabled="loading"
      />
      <FormField
        type="number"
        name="long"
        label="Longitude"
        :error="errors.long"
        :disabled="loading"
      />

      <div class="flex justify-end gap-2 mt-2">
        <button
          :disabled="loading"
          class="btn btn-outline"
          type="button"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button
          :disabled="loading"
          class="btn btn-primary"
          type="submit"
        >
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
          Add
        </button>
      </div>
    </form>
  </section>
</template>
