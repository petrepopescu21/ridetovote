// TimelineStep.vue - Desktop timeline step component with left/right positioning
<template>
  <div class="flex items-center">
    <!-- Left side content -->
    <div class="flex-1 pr-8 text-right" v-if="position === 'left'">
      <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.primaryColor }">
        {{ title }}
      </h3>
      <p class="dark:text-gray-300" :style="{ color: colors.textColor }" v-html="description"></p>
    </div>
    <!-- Empty space if position is right -->
    <div class="flex-1 pr-8 text-right" v-else></div>

    <!-- Circle with number -->
    <div
      class="absolute left-1/2 transform -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-xl"
      :style="{ backgroundColor: colors.primaryColor }"
    >
      {{ number }}
    </div>

    <!-- Empty space if position is left -->
    <div class="flex-1 pl-8 text-left" v-if="position === 'left'"></div>
    <!-- Right side content -->
    <div class="flex-1 pl-8 text-left" v-else>
      <h3 class="text-xl font-semibold mb-2" :style="{ color: colors.primaryColor }">
        {{ title }}
      </h3>
      <p class="dark:text-gray-300" :style="{ color: colors.textColor }" v-html="description"></p>
    </div>
  </div>
</template>

<script>
import { colors } from '@/data'

export default {
  name: 'TimelineStep',
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
    position: {
      type: String,
      validator: function (value) {
        return ['left', 'right'].includes(value)
      },
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
  },
}
</script>