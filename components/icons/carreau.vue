<script setup>
defineProps({
  color: String,
});
</script>

<template>
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path d="M0 45L35 80H45L80 45V35L45 0H35L0 35V45Z" :fill="color"></path>
  </svg>
</template>
