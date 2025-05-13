// ActionButton.vue - Reusable button component with primary/secondary styles
<template>
  <a
    :class="disabled ? 'disabled' : ''"
    :href="url"
    class="inline-block py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
    :style="buttonStyle"
  >
    <i :class="icon + ' mr-2'"></i> {{ text }}
  </a>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    type: {
      type: String,
      validator: function (value) {
        return ['primary', 'secondary'].includes(value)
      },
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    buttonStyle() {
      if (this.type === 'primary') {
        return {
          backgroundColor: this.colors.primaryColor,
          color: this.colors.bgColor,
        }
      } else {
        return {
          backgroundColor: this.colors.secondaryColor,
          color: this.colors.bgColor,
        }
      }
    },
  },
}
</script>

<style scoped>
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>