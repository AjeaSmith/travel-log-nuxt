import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
<<<<<<< Updated upstream
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
=======
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon"],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  // eslint: {
  //   config: { standalone: false },
  // },
});
>>>>>>> Stashed changes
