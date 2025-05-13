<template>
  <nav
    class="sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-70"
    :style="{ backgroundColor: currentColors.bgColor, color: currentColors.textColor }"
  >
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <i class="fas fa-bicycle text-2xl" :style="{ color: currentColors.primaryColor }"></i>
        <span class="font-bold text-xl" :style="{ color: currentColors.secondaryColor }">
          Ride to Vote
        </span>
      </div>
      <div class="flex items-center space-x-4">
        <button @click="$emit('toggle-dark-mode')" class="p-2 rounded-full hover:bg-opacity-20">
          <i class="fas" :class="darkMode ? 'fa-sun' : 'fa-moon'"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
    currentColors: {
      type: Object,
      required: true,
    },
  },
}
</script>
