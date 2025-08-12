<script setup lang="ts">
const props = defineProps<{ error?: string; label: string; name: string; type?: "text" | "textarea" | "number"; disabled?: boolean }>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="type === 'number' ? 'input' : type || type || 'input'"
      :type="type || 'text'"
      :disabled="disabled"
      class="w-full"
      :class="{ 'input-error': props.error,
                'input': !type || type === 'text' || type === 'number',
                'textarea': type === 'textarea',
      }"
      :name="name"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
