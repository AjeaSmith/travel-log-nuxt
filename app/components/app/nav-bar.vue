<template>
  <header class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="navbar-end gap-4">
      <button class="btn btn-accent">
        Sign in with Github  <Icon name="tabler:brand-github" size="24" />
      </button>
      <AppThemeToggle />
    </div>
  </header>
</template>
