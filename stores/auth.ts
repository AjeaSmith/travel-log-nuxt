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
    const { csrf } = useCsrf();
    const headers = new Headers();

    headers.append("csrf-token", csrf);

    await authClient.signIn.social({ provider: "github", callbackURL: "/dashboard", errorCallbackURL: "/error", fetchOptions: { headers } });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();

    headers.append("csrf-token", csrf);
    await authClient.signOut({ fetchOptions: { headers } });
    navigateTo("/");
  }

  return { isloading, signWithGithub, signOut, user, init };
});
