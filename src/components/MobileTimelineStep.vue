// MobileTimelineStep.vue - Mobile-friendly timeline step component
<template>
  <div class="flex items-start">
    <div class="mr-4">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
        :style="{ backgroundColor: accentColor, color: numberColor }"
      >
        {{ number }}
      </div>
    </div>
    <div>
      <h3 class="text-xl font-semibold mb-2" :style="{ color: accentColor }">
        {{ title }}
      </h3>
      <p :style="{ color: colors.textColor }" v-html="description"></p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    accentColor() {
      if (this.number == '1' || this.number == '4') {
        return this.colors.primaryColor
      } else {
        return this.colors.secondaryColor
      }
    },
    numberColor() {
      if (this.number == '1' || this.number == '4') {
        return this.colors.textColor
      } else {
        return this.colors.bgColor
      }
    },
  },
  name: 'MobileTimelineStep',
  props: {
    number: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
  },
}
</script>
