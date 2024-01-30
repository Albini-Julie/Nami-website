<template>
  <div class="card">
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
    <card_info
      :color="color"
      :colorText="colorText"
      :langue="langue"
      :capitale="capitale"
      :img_spe="img_spe"
      :img_dra="img_dra"
      :superficie="superficie"
      :pop="pop"
      :specialite="specialite"
    />
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 0;
  height: 300vh;
  overflow: hidden;
  position: relative;
  background-image: url("/Italie.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 15% 0px;
}
</style>

<script>
export default {
  props: {
    heure: String,
    nom: String,
    temp: String,
    weather: String,
    latitude: String,
    longitude: String,
    color: String,
    colorText: String,
    img_dra: String,
    img_spe: String,
    pop: String,
    superficie: String,
    capitale: String,
    specialite: String,
    langue: String,
  },
};
</script>
