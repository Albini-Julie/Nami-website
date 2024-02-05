<!--Intégration du bloc et de son contenu-->
<template>
  <!--Box générale-->
  <div class="legal">
    <!--Bloc blanc-->
    <div class="legal__bloc">
      <!--Titre-->
      <h4 class="legal__soustitre">{{ titre }}</h4>
      <!--Textes du bloc-->
      <div v-for="text in content">
        <p class="legal__text">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<!--Styles scss du bloc et de son contenu-->
<style lang="scss" scoped>
//Styles de la box contenant l'ensemble du contenu
.legal {
  display: flex;
  justify-content: space-around;
  // styles du bloc blanc
  &__bloc {
    background-color: hsla(0, 0%, 100%, 0.6);
    padding: rem(15);
    display: flex;
    flex-direction: column;
    width: 80%;
    @include large-up {
    }
    @include x-large-up {
      width: 70%;
    }
  }

  // Styles du titre du bloc
  &__soustitre {
    margin: 0px;
    margin-bottom: 20px;
    font-family: $secondary-font-family;
    font-weight: 400;
    font-size: rem(30);
  }

  // Styles des textes du bloc
  &__text {
    margin: 0px;
    font-family: $secondary-font-family;
    font-size: rem(20);
    font-weight: 400;
  }
}
</style>

<!--Création des props titre pour le titre du bloc
<!-- de content pour le texte dans le bloc
<!--Content est un tableau contenant les différents textes du bloc-->
<script>
export default {
  props: {
    titre: String,
    content: Array,
  },
};
</script>
