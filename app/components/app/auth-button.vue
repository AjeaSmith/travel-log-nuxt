<script lang="ts" setup>
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.isloading && authStore.user" class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      <div v-if="authStore.user.image" class="avatar">
        <div class="w-8 rounded-full">
          <img :src="authStore.user.image" :alt="authStore.user.name">
        </div>
      </div>
      {{ authStore.user.name }}
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <NuxtLink to="/sign-out">
          Sign out
        </NuxtLink>
      </li>
    </ul>
  </div>
  <button
    v-else
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
