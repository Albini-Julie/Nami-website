<template>
  <card_intro
    :heure="heure"
    :nom="nom"
    :temp="temp"
    :weather="weather"
    :latitude="latitude"
    :longitude="longitude"
    :color="color"
    :colorText="colorText"
  />
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, defineProps } from "vue";

defineProps({
  heure: String,
  nom: String,
  temp: String,
  weather: String,
  latitude: String,
  longitude: String,
  color: String,
  colorText: String,
});
</script>
