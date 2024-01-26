<template>
  <div class="meteo">
    <p class="meteo__text">
      Vous vous trouvez à {{ ville }} le temps est {{ weather }} et il fait
      {{ temp_act }}°C. Aujourd’hui, la température minimale chez vous sera de
      {{ temp_min }}°C et la température maximale {{ temp_max }}°C.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.meteo {
  height: 110vh;
  width: 100%;
  background-color: v-bind(primaryColor);
}
</style>

<script setup>
defineProps({
  primaryColor: String,
  secondaryColor: String,
  primaryColorText: String,
  secondaryColorText: String,
  ville: String,
  temp_act: String,
  temp_min: String,
  temp_max: String,
  weather: String,
});
</script>
