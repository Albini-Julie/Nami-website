<!--Création de la props color-->
<script setup>
defineProps({
  color: String,
});
</script>

<!--SVG de l'icon utilisant la props color-->
<template>
  <svg
    viewBox="0 0 70 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M58.8723 27.1992C43.7499 15.9603 38.5391 6.96345 35 0.00015C34.9997 0.00015 34.9996 0 34.9996 0V0.00015C31.4608 6.96345 26.2497 15.9605 11.1273 27.1992C-14.6567 46.3622 9.61349 73.1108 30.9522 58.3887C29.5618 67.5237 24.817 74.1834 19.9984 77.0511V80H34.9996H50.0009V77.0516C45.182 74.1839 40.4375 67.524 39.047 58.3887C60.3855 73.1111 84.6561 46.3622 58.8723 27.1992Z"
      :fill="color"
    ></path>
  </svg>
</template>
