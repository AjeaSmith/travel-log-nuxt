<script setup lang="ts">
import AuthButton from "./auth-button.vue";
</script>

<template>
  <header class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="navbar-end gap-4">
      <AppThemeToggle />
      <AuthButton />
    </div>
  </header>
</template>
