<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.signOut();
});
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4">
    <span class="loading loading-ring loading-xl" />
  </div>
</template>
