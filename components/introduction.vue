<!--Intégration de l'introduction-->
<template>
  <!--Bloc contenant toute l'introduction-->
  <div class="introduction">
    <!--Première partie du titre-->
    <h1 class="introduction__title">Le site qui vous ouvre</h1>
    <!--Deuxième partie du titre-->
    <h1 class="introduction__title --monde">au monde</h1>
    <!--Icon Fleche-->
    <div class="introduction__icon">
      <IconsFleche id="scrollButton" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Styles du bloc contenant toute l'introduction
.introduction {
  margin: 0; /* Ajustez les marges selon vos besoins */
  padding: 0; /* Ajustez les rembourrages selon vos besoins */
  height: 110vh; /* 100% de la hauteur de la fenêtre visible */
  overflow: hidden; /* Pour éviter tout débordement de contenu */
  position: relative;

  background-image: url("/ciel-degage.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  // Styles de l'icon
  &__icon {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
  }

  // Styles des titres
  &__title {
    position: relative;
    color: $secondary-color;
    font-size: rem(50);
    font-family: $tertiary-font-family;
    margin: 0px;
    padding-top: 10%;
    padding-left: 15px;
    padding-right: 15px;
    @include medium-up {
      font-size: rem(80);
      padding-left: 5%;
      padding-right: 0px;
    }
    @include large-up {
      font-size: rem(90);
      padding-left: 5%;
      padding-right: 0px;
    }
    @include x-large-up {
      font-size: $giant-font-size;
      padding-left: 5%;
      padding-right: 0px;
    }

    // Styles de la seconde partie du titre
    &.--monde {
      text-transform: uppercase;
      color: v-bind(primaryColor);
      padding-top: 0px;
      font-size: rem(70);
      @include medium-up {
        font-size: rem(120);
      }
      @include large-up {
        font-size: rem(120);
      }
      @include x-large-up {
        font-size: $giant-font-size;
      }
    }
  }
}
</style>

<script>
// Création des props
// primaryColor contenant le code hexadécimal de la première couleur à utiliser pour le contenu
// secondaryColor contenant le code hexadécimal de la seconde couleur à utiliser pour le contenu
// primaryColorText contenant le code hexadécimal de la couleur à utiliser pour le texte du contenu utilisant primaryColor
// secondaryColorText contenant le code hexadécimal de la couleur à utiliser pour le texte du contenu utilisant secondaryColor
export default {
  props: {
    primaryColor: String,
    secondaryColor: String,
    primaryColorText: String,
    secondaryColorText: String,
  },
};
</script>
