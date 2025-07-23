import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";
import { ref } from "vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("auth", () => {
  const isloading = ref(false);

  async function signWithGithub() {
    isloading.value = true;
    await authClient.signIn.social({ provider: "github", callbackURL: "/dashboard", errorCallbackURL: "/error" });
    isloading.value = false;
  }

  return { isloading, signWithGithub };
});
