import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("auth", () => {
  const session = authClient.useSession();

  const user = computed(() => session.value.data?.user);
  const isloading = computed(() => session.value.isPending || session.value.isRefetching);

  async function signWithGithub() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/dashboard", errorCallbackURL: "/error" });
  }

  async function signOut() {
    await authClient.signOut();
    navigateTo("/");
  }

  return { isloading, signWithGithub, signOut, user };
});
