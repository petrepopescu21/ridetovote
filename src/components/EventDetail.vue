// EventDetail.vue - Event detail card component
<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105"
    :style="{
      borderTop: '4px solid ' + colors.primaryColor,
      backgroundColor: colors.textColor,
    }"
  >
    <div class="flex justify-center mb-4">
      <div
        class="w-16 h-16 rounded-full flex items-center justify-center"
        :style="{ backgroundColor: colors.secondaryColor }"
      >
        <i :class="icon + ' text-2xl'" :style="{ color: colors.accentColor }"></i>
      </div>
    </div>
    <h3 class="text-lg font-semibold text-center mb-2" :style="{ color: colors.bgColor }">
      {{ title }}
    </h3>
    <p class="text-center dark:text-gray-300" :style="{ color: colors.bgColor }">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'EventDetail',
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