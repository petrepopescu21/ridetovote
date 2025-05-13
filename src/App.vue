<template>
  <div
    :style="{ backgroundColor: currentColors.bgColor }"
    class="min-h-screen transition-all duration-500 ease-in-out"
  >
    <Navigation
      :darkMode="darkMode"
      :currentColors="currentColors"
      @toggle-dark-mode="toggleDarkMode"
    />
    <HeroSection :colors="currentColors" :darkMode="darkMode" />
    <main class="container mx-auto px-6 py-12">
      <SectionContainer title="Detalii Eveniment" :colors="currentColors">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EventDetail
            :colors="currentColors"
            v-for="(detail, index) in eventDetails"
            :key="index"
            :icon="detail.icon"
            :title="detail.title"
            :description="detail.description"
          />
        </div>
      </SectionContainer>

      <SectionContainer title="Cum funcționează?" :colors="currentColors">
        <!-- Desktop timeline -->
        <div class="relative hidden md:block">
          <!-- Timeline line -->
          <div
            class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"
          ></div>

          <div class="space-y-12 relative">
            <TimelineStep
              v-for="(step, index) in timelineSteps"
              :key="index"
              :number="step.number"
              :title="step.title"
              :description="step.description"
              :position="step.position"
              :colors="currentColors"
            />
          </div>
        </div>

        <!-- Mobile timeline -->
        <div class="md:hidden space-y-8">
          <MobileTimelineStep
            v-for="(step, index) in timelineSteps"
            :key="index"
            :number="step.number"
            :title="step.title"
            :description="step.description"
            :accentColor="currentColors.accentColor"
          />
        </div>
      </SectionContainer>

      <div class="mb-16 text-center">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionButton
            v-for="(button, index) in actionButtons"
            :key="index"
            :type="button.type"
            :text="button.text"
            :icon="button.icon"
            :url="button.url"
            :colors="currentColors"
          />
        </div>
      </div>

      <SectionContainer
        title="Pune pe hartă pinul secției tale de votare & pedalăm împreună spre ea!"
        :colors="currentColors"
      >
        <p class="text-center mb-4" :style="{ color: currentColors.textColor }">
          Harta e vie. Se mișcă cu tine, cu noi toți.<br />Înscrie-te, vezi ce secții au înscris
          deja alți bicicliști & pune pinul tău pe hartă: îl punem și noi în traseul nostru. 💙
        </p>
        <LocationMap />
      </SectionContainer>

      <SectionContainer title="Reguli de bază" :colors="currentColors">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Rule
            v-for="(rule, index) in rules"
            :key="index"
            :icon="rule.icon"
            :title="rule.title"
            :description="rule.description"
            :colors="currentColors"
          />
        </div>
      </SectionContainer>
    </main>
  </div>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue'
import SectionContainer from '@/components/SectionContainer.vue'
import EventDetail from '@/components/EventDetail.vue'
import TimelineStep from '@/components/TimelineStep.vue'
import MobileTimelineStep from '@/components/MobileTimelineStep.vue'
import ActionButton from '@/components/ActionButton.vue'
import Rule from '@/components/Rule.vue'
import Navigation from '@/components/Navigation.vue'
import LocationMap from '@/components/LocationMap.vue'
import { eventDetails, timelineSteps, actionButtons, rules, colors } from './data.js'

export default {
  name: 'RideToVoteApp',
  components: {
    HeroSection,
    SectionContainer,
    EventDetail,
    TimelineStep,
    MobileTimelineStep,
    ActionButton,
    Rule,
    LocationMap,
    Navigation,
  },
  data() {
    return {
      darkMode: false,
      eventDetails,
      timelineSteps,
      actionButtons,
      rules,
      colors,
    }
  },
  computed: {
    currentColors() {
      return this.darkMode ? this.colors.dark : this.colors.light
    },
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', this.darkMode)
    },
  },
  mounted() {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      this.darkMode = savedDarkMode === 'true'
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true
    }
  },
}
</script>

<style scoped>
header {
  line-height: 1.5;
}
</style>
