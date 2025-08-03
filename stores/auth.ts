import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("auth", () => {
  const session = ref<Awaited<ReturnType <typeof authClient.useSession>> | null>(null);
  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);
  const isloading = computed(() => session.value?.isPending);

  async function signWithGithub() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/dashboard", errorCallbackURL: "/error" });
  }

  async function signOut() {
    await authClient.signOut();
    navigateTo("/");
  }

  return { isloading, signWithGithub, signOut, user, init };
});
