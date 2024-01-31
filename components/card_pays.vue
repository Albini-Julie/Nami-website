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
    <div class="card__content">
      <card_info
        class="card__infos"
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
      <card_news :color="color" :colorText="colorText" :chemin="chemin" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 0;

  background-image: url("/Italie.jpg");
  background-size: cover; /* Utilisez "contain" à la place si vous préférez que l'image soit contenue dans toute la zone */
  background-position: center; /* Ajustez la position si nécessaire */
  background-repeat: no-repeat;
  height: 100%; /* Assurez-vous que la*/
  padding: 30% 0px;
  @include large-up {
    padding: 15% 0px;
  }

  &__infos {
    margin-top: rem(50);
    @include large-up {
      margin-top: rem(0);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: rem(50);
    @include x-large-up {
      flex-direction: row;
      padding: 0% 5%;
    }
  }
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
    chemin: String,
  },
};
</script>
