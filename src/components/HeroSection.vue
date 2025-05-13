// HeroSection.vue - Hero section component
<template>
  <header class="relative overflow-hidden" :style="{ backgroundColor: colors.textColor }">
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPgogICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iNDAiIHkyPSIwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPgogIDwvcGF0dGVybj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=');
          transform: scale(3);
        "
      ></div>
    </div>
    <div class="container mx-auto px-6 py-16 relative z-10">
      <div class="text-center">
        <div class="flex items-center justify-center">
          <img
            v-if="darkMode"
            ref="logo"
            src="../assets/logo-light.png"
            alt="Ride to Vote"
            class="max-w-3xl mb-4"
          />
          <img
            v-if="!darkMode"
            ref="logo"
            src="../assets/logo-dark.png"
            alt="Ride to Vote"
            class="max-w-3xl mb-4"
          />
        </div>
        <p
          class="animate__animated animate__fadeInUp text-xl md:text-2xl font-light mb-8 text-white opacity-90"
          :style="{ color: colors.secondaryTextColor }"
        >
          Pedalează spre Vot
        </p>
        <div class="animate__animated animate__fadeIn animate__delay-1s mx-auto max-w-3xl">
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl"
            :style="{ backgroundColor: colors.secondaryColor }"
          >
            <p class="text-lg" :style="{ color: colors.bgColor }">
              Bine ai venit la inițiativa <strong>Ride to Vote</strong> - un eveniment ciclist
              prietenos care îmbină sportul cu implicarea civică. Ne propunem să mergem împreună cu
              bicicletele la secțiile de votare în ziua alegerilor prezidențiale.
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    colors: {
      type: Object,
      required: true,
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
header {
  line-height: 1.5;
}
</style>
