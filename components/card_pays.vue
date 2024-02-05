<!--Intégration de la card pays-->
<template>
  <!--Bloc contenant l'ensemble de la carte-->
  <div class="card">
    <!--Importation de la card intro-->
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
      <!--Importation de la card_info-->
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
      <!--Importation de la card_news-->
      <card_news :color="color" :colorText="colorText" :chemin="chemin" />
    </div>
  </div>
</template>

<!--Styles de la card_pays-->
<style lang="scss" scoped>
// Styles du bloc contenant l'ensemble des cards
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

  // Styles de la card_info
  &__infos {
    margin-top: rem(50);
    @include large-up {
      margin-top: rem(0);
    }
  }

  // Styles du bloc contenant card_info et card_news
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

<!--Création des props
heure contient le chemin à mettre dans la requête de l'API pour obtenir l'heure du pays
nom contient le nom du pays
latitude contient la latitude de la capitale du pays
longitude contient la longitude de la capitale du pays
color contient le code hexadécimal de la couleur du contenu à utiliser
colorText contient le code hexadécimal de la couleur du texte à utiliser
img_dra contient le chemin vers l'image du drapeau dans la BDD
img_spe contient le chemin vers l'image de la specialite dans la BDD
pop contient l'information de la population du pays
superficie contient l'information de la superficie du pays
capitale contient le nom de l acapitale du pays
specialite contient le nom de la specialite du pays
langue contient le nom de la langue officielle du pays
chemin contient le chemin à mettre dans la requête pour obtenir les news du pays -->
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
