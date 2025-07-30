<script lang="ts" setup>
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <button
    :disabled="authStore.isloading"
    type="button"
    class="btn btn-accent"
    @click="authStore.signWithGithub"
  >
    Sign in with Github

    <span v-if="authStore.isloading" class="loading loading-ring loading-md" />
    <Icon
      v-else
      name="tabler:brand-github"
      size="24"
    />
  </button>
</template>
