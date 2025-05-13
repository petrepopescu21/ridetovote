// MobileTimelineStep.vue - Mobile-friendly timeline step component
<template>
  <div class="flex items-start">
    <div class="mr-4">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
        :style="{ backgroundColor: colors.primaryColor }"
      >
        {{ number }}
      </div>
    </div>
    <div>
      <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.primaryColor }">
        {{ title }}
      </h3>
      <p :style="{ color: colors.textColor }" v-html="description"></p>
    </div>
  </div>
</template>

<script>
export default {
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
