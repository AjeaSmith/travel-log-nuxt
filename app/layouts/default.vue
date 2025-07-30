<script setup lang="ts">
// const authStore = useAuthStore();

// await authStore.getUserSession();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavBar />
    <main>
      <slot />
    </main>
  </div>
</template>
