<template>
  <div class="meteo">
    <p class="meteo__text">
      Vous vous trouvez à {{ ville }} le temps est {{ weather }} et il fait
      {{ temp_act }}°C. Aujourd’hui, la température minimale chez vous sera de
      {{ temp_min }}°C et la température maximale {{ temp_max }}°C.
    </p>
    <div>
      <IconsSoleil />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.meteo {
  height: 110vh;
  width: 100%;
  background-color: v-bind(primaryColor);
  padding-top: rem(70);
  display: flex;
  justify-content: space-around;

  &__text {
    color: v-bind(primaryColorText);
    font-family: $primary-font-family;
    font-size: $big-font-size;

    @include large-up {
      font-size: 50px;
    }
  }
}
</style>

<script setup>
const props = defineProps({
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
