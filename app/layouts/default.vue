<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();

await authStore.init();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavBar />
    <main class="flex flex-col flex-1">
      <slot />
    </main>
  </div>
</template>
