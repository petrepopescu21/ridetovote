<template>
  <!-- Navigation -->
  <nav class="sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-70"
    :class="[darkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white bg-opacity-70']">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <i class="fas fa-bicycle text-2xl" :style="{ color: colors.accentColor }"></i>
        <span class="font-bold text-xl" :style="{ color: colors.accentColor }"
          style="font-family: 'Montserrat', sans-serif">Ride to Vote</span>
      </div>
      <div class="flex items-center space-x-4">
        <button @click="randomizeColors"
          class="px-3 py-1 rounded-full text-white text-sm transition-all duration-300 hover:shadow-lg"
          :style="{ backgroundColor: colors.accentColor }">
          <i class="fas fa-palette mr-1"></i> Schimbă Culorile
        </button>
        <button :style="{ color: colors.accentColor }" @click="toggleDarkMode"
          class="p-2 rounded-full hover:bg-opacity-20" :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'">
          <i class="fas" :class="darkMode ? 'fa-sun' : 'fa-moon'"></i>
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="relative overflow-hidden" :style="{ backgroundColor: colors.primaryColor }">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPgogICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iNDAiIHkyPSIwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPgogIDwvcGF0dGVybj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=');
          transform: scale(3);
        "></div>
    </div>
    <div class="container mx-auto px-6 py-16 relative z-10">
      <div class="text-center">
        <h1 class="animate__animated animate__fadeInDown text-4xl md:text-6xl font-extrabold mb-2 text-white"
          style="font-family: 'Montserrat', sans-serif">
          Ride to Vote
        </h1>
        <p class="animate__animated animate__fadeInUp text-xl md:text-2xl font-light mb-8 text-white opacity-90">
          Pedalează spre Vot
        </p>
        <div class="animate__animated animate__fadeIn animate__delay-1s mx-auto max-w-3xl">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl bg-opacity-90 dark:bg-opacity-90">
            <p class="text-gray-700 dark:text-gray-300 text-lg">
              Bine ai venit la inițiativa <strong>Ride to Vote</strong> - un eveniment ciclist
              prietenos care îmbină sportul cu implicarea civică. Ne propunem să mergem împreună cu
              bicicletele la secțiile de votare în ziua alegerilor prezidențiale.
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div id="app" v-cloak :class="{ dark: darkMode }">
    <div :style="{ backgroundColor: colors.bgColor, color: colors.textColor }"
      class="min-h-screen transition-all duration-500 ease-in-out">
      <main class="container mx-auto px-6 py-12">
        <!-- Event Details -->
        <div class="mb-16">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
            <h2 class="text-2xl font-bold mx-4" :style="{ color: colors.accentColor }">
              Detalii Eveniment
            </h2>
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105"
              :style="{ borderTop: '4px solid ' + colors.accentColor }">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 rounded-full flex items-center justify-center"
                  :style="{ backgroundColor: colors.accentColor + '20' }">
                  <i class="fas fa-calendar-day text-2xl" :style="{ color: colors.accentColor }"></i>
                </div>
              </div>
              <h3 class="text-lg font-semibold text-center mb-2">Data</h3>
              <p class="text-center dark:text-gray-300">În ziua alegerilor prezidențiale</p>
            </div>

            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105"
              :style="{ borderTop: '4px solid ' + colors.accentColor }">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 rounded-full flex items-center justify-center"
                  :style="{ backgroundColor: colors.accentColor + '20' }">
                  <i class="fas fa-map-marker-alt text-2xl" :style="{ color: colors.accentColor }"></i>
                </div>
              </div>
              <h3 class="text-lg font-semibold text-center mb-2">Punct de întâlnire</h3>
              <p class="text-center dark:text-gray-300">
                Parcul Cișmigiu, intrarea dinspre Bulevardul Regina Elisabeta, lângă fântâna
                centrală
              </p>
            </div>

            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105"
              :style="{ borderTop: '4px solid ' + colors.accentColor }">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 rounded-full flex items-center justify-center"
                  :style="{ backgroundColor: colors.accentColor + '20' }">
                  <i class="fas fa-clock text-2xl" :style="{ color: colors.accentColor }"></i>
                </div>
              </div>
              <h3 class="text-lg font-semibold text-center mb-2">Ora</h3>
              <p class="text-center dark:text-gray-300">
                09:00 AM - ne organizăm și pornim la 09:30 AM
              </p>
            </div>
          </div>
        </div>

        <!-- How it works -->
        <div class="mb-16">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
            <h2 class="text-2xl font-bold mx-4" :style="{ color: colors.accentColor }">
              Cum funcționează?
            </h2>
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
          </div>

          <!-- Desktop timeline -->
          <div class="relative hidden md:block">
            <!-- Timeline line -->
            <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>

            <div class="space-y-12 relative">
              <!-- Step 1 -->
              <div class="flex items-center">
                <div class="flex-1 pr-8 text-right">
                  <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                    Înscrie-te
                  </h3>
                  <p class="dark:text-gray-300">
                    Completează formularul și spune-ne la ce secție de votare vrei să ajungi. Ne asigurăm că drumul tău
                    va fi perfect, inclus în circuit.
                  </p>
                </div>
                <div
                  class="absolute left-1/2 transform -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-xl"
                  :style="{ backgroundColor: colors.accentColor }">
                  1
                </div>
                <div class="flex-1 pl-8 text-left"></div>
              </div>

              <!-- Step 2 -->
              <div class="flex items-center">
                <div class="flex-1 pr-8 text-right"></div>
                <div
                  class="absolute left-1/2 transform -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-xl"
                  :style="{ backgroundColor: colors.accentColor }">
                  2
                </div>
                <div class="flex-1 pl-8 text-left">
                  <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                    Planificăm traseul
                  </h3>
                  <p class="dark:text-gray-300">
                    Ne ocupăm noi de traseu! Vom crea o rută care să te aducă în siguranță la secția ta de votare,
                    ținând cont de toți participanții.<br />Acolo te așteptăm să votezi, apoi pornim către următoarea
                    secție. It is about the journey together.
                  </p>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="flex items-center">
                <div class="flex-1 pr-8 text-right">
                  <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                    Ne întâlnim
                  </h3>
                  <p class="dark:text-gray-300">
                    Pe 18 mai ne vedem la punctul de întâlnire și pornim împreună pe biciclete, într-o călătorie spre
                    secțiile de votare.
                  </p>
                </div>
                <div
                  class="absolute left-1/2 transform -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-xl"
                  :style="{ backgroundColor: colors.accentColor }">
                  3
                </div>
                <div class="flex-1 pl-8 text-left"></div>
              </div>

              <!-- Step 4 -->
              <div class="flex items-center">
                <div class="flex-1 pr-8 text-right"></div>
                <div
                  class="absolute left-1/2 transform -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-xl"
                  :style="{ backgroundColor: colors.accentColor }">
                  4
                </div>
                <div class="flex-1 pl-8 text-left">
                  <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                    Pedalăm și votăm
                  </h3>
                  <p class="dark:text-gray-300">
                    Pentru că fiecare pas contează și fiecare pedală ne aduce mai aproape de schimbare.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile timeline - optimized with numbers before text -->
          <div class="md:hidden space-y-8">
            <!-- Step 1 -->
            <div class="flex items-start">
              <div class="mr-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  :style="{ backgroundColor: colors.accentColor }">
                  1
                </div>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                  Înscrie-te
                </h3>
                <p class="dark:text-gray-300">
                  Completează formularul și spune-ne la ce secție de votare vrei să ajungi. Ne asigurăm că drumul tău va
                  fi perfect, inclus în circuit.
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start">
              <div class="mr-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  :style="{ backgroundColor: colors.accentColor }">
                  2
                </div>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                  Planificăm traseul
                </h3>
                <p class="dark:text-gray-300">
                  Ne ocupăm noi de traseu! Vom crea o rută care să te aducă în siguranță la secția ta de votare, ținând
                  cont de toți participanții.<br />Acolo te așteptăm să votezi, apoi pornim către următoarea secție. It
                  is about the journey together.
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-start">
              <div class="mr-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  :style="{ backgroundColor: colors.accentColor }">
                  3
                </div>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                  Ne întâlnim
                </h3>
                <p class="dark:text-gray-300">
                  Pe 18 mai ne vedem la punctul de întâlnire și pornim împreună pe biciclete, într-o călătorie spre
                  secțiile de votare.
                </p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex items-start">
              <div class="mr-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  :style="{ backgroundColor: colors.accentColor }">
                  4
                </div>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.accentColor }">
                  Pedalăm și votăm
                </h3>
                <p class="dark:text-gray-300">
                  Pentru că fiecare pas contează și fiecare pedală ne aduce mai aproape de schimbare.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="mb-16 text-center">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeiN0q8f4bmPmn1rGiltKxN0Qdd2donwy4vYaVxYQrhf-LQCw/viewform"
              class="inline-block py-4 px-8 rounded-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              :style="{ backgroundColor: colors.accentColor }">
              <i class="fas fa-user-plus mr-2"></i> ÎSCRIE-TE AICI
            </a>

            <a href="https://goo.gl/maps/YourPlannedRouteLink"
              class="inline-block py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              :style="{
                backgroundColor: colors.secondaryColor,
                color: colors.textColorSecondary,
              }">
              <i class="fas fa-route mr-2"></i> VEZI TRASEUL
            </a>
          </div>
        </div>
        <div class="mb-16">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
            <h2 class="text-2xl font-bold mx-4" :style="{ color: colors.accentColor }">
              Unde vom merge
            </h2>
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
          </div>
          <p class="text-center mb-4 dark:text-gray-300">
            Bla bla aici s-a inscris lumea pana acum
          </p>
          <LocationMap />
        </div>

        <!-- Rules -->
        <div class="mb-16">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
            <h2 class="text-2xl font-bold mx-4" :style="{ color: colors.accentColor }">
              Reguli de bază
            </h2>
            <div class="h-px bg-gray-300 dark:bg-gray-700 w-24"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              :style="{ borderLeft: '4px solid ' + colors.accentColor }">
              <div class="flex items-start">
                <div class="mr-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: colors.accentColor + '20' }">
                    <i class="fas fa-helmet-safety" :style="{ color: colors.accentColor }"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Siguranța pe primul loc</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Poartă cască de protecție și respectă toate regulile de circulație.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              :style="{ borderLeft: '4px solid ' + colors.accentColor }">
              <div class="flex items-start">
                <div class="mr-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: colors.accentColor + '20' }">
                    <i class="fas fa-users" :style="{ color: colors.accentColor }"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Rămânem împreună</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Grupul va merge împreună și nimeni nu va fi lăsat în urmă.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              :style="{ borderLeft: '4px solid ' + colors.accentColor }">
              <div class="flex items-start">
                <div class="mr-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: colors.accentColor + '20' }">
                    <i class="fas fa-water" :style="{ color: colors.accentColor }"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Aduceți</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Apă, protecție solară, și, desigur, actele necesare pentru vot.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              :style="{ borderLeft: '4px solid ' + colors.accentColor }">
              <div class="flex items-start">
                <div class="mr-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: colors.accentColor + '20' }">
                    <i class="fas fa-handshake" :style="{ color: colors.accentColor }"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Respect</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Acesta este un eveniment civic nepolitizat. Respectăm toate opiniile politice.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              :style="{ borderLeft: '4px solid ' + colors.accentColor }">
              <div class="flex items-start">
                <div class="mr-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: colors.accentColor + '20' }">
                    <i class="fas fa-wrench" :style="{ color: colors.accentColor }"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Pregătire</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Verifică-ți bicicleta înainte de eveniment (frâne, anvelope, lanț).
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              :style="{ borderLeft: '4px solid ' + colors.accentColor }">
              <div class="flex items-start">
                <div class="mr-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: colors.accentColor + '20' }">
                    <i class="fas fa-ban" :style="{ color: colors.accentColor }"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Fără alcool</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Nu este permis consumul de alcool sau substanțe interzise în timpul
                    evenimentului.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>


<script>
import LocationMap from '@/components/LocationMap.vue'
export default {
  name: 'RideToVoteApp',
  components: {
    LocationMap,
  },
  data() {
    return {
      darkMode: false,
      colors: {
        primaryColor: '#4361ee',
        secondaryColor: '#f72585',
        accentColor: '#4cc9f0',
        bgColor: '#ffffff',
        textColor: '#333333',
        textColorSecondary: '#ffffff',
      },
      colorSchemes: [
        // Modern & Vibrant
        {
          primaryColor: '#4361ee',
          secondaryColor: '#f72585',
          accentColor: '#4cc9f0',
          bgColor: '#ffffff',
          textColor: '#333333',
          textColorSecondary: '#ffffff',
        },
        // Nature Inspired
        {
          primaryColor: '#588157',
          secondaryColor: '#3a5a40',
          accentColor: '#a3b18a',
          bgColor: '#ffffff',
          textColor: '#333333',
          textColorSecondary: '#ffffff',
        },
        // Sunset
        {
          primaryColor: '#ff9e00',
          secondaryColor: '#ff4d00',
          accentColor: '#ff0054',
          bgColor: '#ffffff',
          textColor: '#333333',
          textColorSecondary: '#ffffff',
        },
        // Ocean
        {
          primaryColor: '#184e77',
          secondaryColor: '#1e6091',
          accentColor: '#1a759f',
          bgColor: '#ffffff',
          textColor: '#333333',
          textColorSecondary: '#ffffff',
        },
        // Retro
        {
          primaryColor: '#e76f51',
          secondaryColor: '#f4a261',
          accentColor: '#2a9d8f',
          bgColor: '#ffffff',
          textColor: '#333333',
          textColorSecondary: '#ffffff',
        },
        // Dark Cyberpunk
        {
          primaryColor: '#4f0147',
          secondaryColor: '#ff124f',
          accentColor: '#ff00a0',
          bgColor: '#1a1a2e',
          textColor: '#eeeeee',
          textColorSecondary: '#ffffff',
        },
        // Romanian Flag Inspired
        {
          primaryColor: '#002B7F', // Blue
          secondaryColor: '#FCD116', // Yellow
          accentColor: '#CE1126', // Red
          bgColor: '#ffffff',
          textColor: '#333333',
          textColorSecondary: '#333333', // Darker text on yellow
        },
        // Pastel
        {
          primaryColor: '#ffafcc',
          secondaryColor: '#cdb4db',
          accentColor: '#a2d2ff',
          bgColor: '#ffffff',
          textColor: '#333333',
          textColorSecondary: '#333333',
        },
      ],
      animationStates: {
        headerVisible: false,
        contentVisible: false,
      },
      mobileMenuOpen: false,
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', this.darkMode)
      if (this.darkMode) {
        this.colors.bgColor = '#1f2937'
        this.colors.textColor = '#f3f4f6'
      } else {
        const currentSchemeIndex = this.getCurrentSchemeIndex()
        this.colors.bgColor = this.colorSchemes[currentSchemeIndex].bgColor
        this.colors.textColor = this.colorSchemes[currentSchemeIndex].textColor
      }
      document.body.classList.add('color-transition')
      setTimeout(() => document.body.classList.remove('color-transition'), 500)
    },
    getCurrentSchemeIndex() {
      return (
        this.colorSchemes.findIndex(
          (scheme) =>
            scheme.primaryColor === this.colors.primaryColor &&
            scheme.secondaryColor === this.colors.secondaryColor
        ) || 0
      )
    },
    randomizeColors() {
      document.body.classList.add('color-transition')
      let currentIndex = this.getCurrentSchemeIndex()
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * this.colorSchemes.length)
      } while (newIndex === currentIndex && this.colorSchemes.length > 1)
      const randomScheme = this.colorSchemes[newIndex]
      setTimeout(() => {
        this.colors = { ...randomScheme }
        if (this.darkMode) {
          this.colors.bgColor = '#1f2937'
          this.colors.textColor = '#f3f4f6'
        }
        localStorage.setItem('colorScheme', JSON.stringify(this.colors))
        setTimeout(() => document.body.classList.remove('color-transition'), 500)
      }, 100)
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    animateOnScroll() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate__animated', 'animate__fadeInUp')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )
      document.querySelectorAll('.scroll-animate').forEach((element) => {
        observer.observe(element)
      })
    },
    copyEmail() {
      const email = 'contact@ridetovote.ro'
      navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.getElementById('emailTooltip')
        tooltip.textContent = 'Copiat!'
        tooltip.classList.add('visible')
        setTimeout(() => {
          tooltip.classList.remove('visible')
          setTimeout(() => (tooltip.textContent = 'Click pentru a copia'), 300)
        }, 2000)
      })
    },
    isMobile() {
      return window.innerWidth < 768
    },
  },
  computed: {
    accentColorOpacity() {
      return {
        light: this.colors.accentColor + '20',
        medium: this.colors.accentColor + '40',
        high: this.colors.accentColor + '80',
      }
    },
  },
  mounted() {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      this.darkMode = savedDarkMode === 'true'
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true
    }
    if (this.darkMode) {
      this.colors.bgColor = '#1f2937'
      this.colors.textColor = '#f3f4f6'
    }
    const savedColorScheme = localStorage.getItem('colorScheme')
    if (savedColorScheme) {
      try {
        const parsedScheme = JSON.parse(savedColorScheme)
        this.colors = {
          ...parsedScheme,
          bgColor: this.darkMode ? '#1f2937' : parsedScheme.bgColor,
          textColor: this.darkMode ? '#f3f4f6' : parsedScheme.textColor,
        }
      } catch (e) {
        console.error('Error parsing saved color scheme:', e)
      }
    }
    setTimeout(() => {
      this.animationStates.headerVisible = true
      setTimeout(() => {
        this.animationStates.contentVisible = true
        this.animateOnScroll()
      }, 300)
    }, 100)

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (localStorage.getItem('darkMode') === null) {
        this.darkMode = e.matches
        if (this.darkMode) {
          this.colors.bgColor = '#1f2937'
          this.colors.textColor = '#f3f4f6'
        } else {
          const currentSchemeIndex = this.getCurrentSchemeIndex()
          this.colors.bgColor = this.colorSchemes[currentSchemeIndex].bgColor
          this.colors.textColor = this.colorSchemes[currentSchemeIndex].textColor
        }
      }
    })

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.mobileMenuOpen) {
        this.mobileMenuOpen = false
      }
    })
  },
}
</script>