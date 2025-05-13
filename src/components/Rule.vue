// Rule.vue - Rule card component
<template>
  <div
    class="p-6 rounded-lg shadow-md"
    :style="{ borderLeft: '4px solid ' + colors.textColor, backgroundColor: colors.textColor }"
  >
    <div class="flex items-start">
      <div class="mr-4">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: colors.secondaryColor }"
        >
          <i :class="icon" :style="{ color: colors.accentColor }"></i>
        </div>
      </div>
      <div>
        <h3 class="font-semibold mb-1" :style="{ color: colors.accentColor }">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-400">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rule',
  props: {
    icon: {
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