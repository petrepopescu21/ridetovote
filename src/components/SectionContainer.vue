// SectionContainer.vue - Reusable section container with title
<template>
  <div class="mb-16">
    <div class="flex items-center justify-center mb-8">
      <h2 class="text-2xl font-bold mx-4" :style="{ color: colors.altAccentColor }">
        {{ title }}
      </h2>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SectionContainer',
  props: {
    title: {
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
