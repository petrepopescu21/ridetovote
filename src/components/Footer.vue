<template>
  <nav
    class="sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-70"
    :style="{ backgroundColor: currentColors.bgColor, color: currentColors.textColor }"
  >
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <span :style="{ color: currentColors.secondaryColor }">
          Ride to Vote nu este o marcă înregistrată și nu este asociată cu niciun partid politic.
        </span>
      </div>
      <div class="flex items-center space-x-4">
        Grafică de&nbsp;
        <a href="https://www.instagram.com/bogdan.png/" target="_blank"
          ><i class="fa-brands fa-instagram"></i>
          bogdan.png
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    currentColors: {
      type: Object,
      required: true,
    },
  },
}
</script>
