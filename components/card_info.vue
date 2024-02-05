<!--Intégration de la carte contenant les informations du pays-->
<template>
  <div class="infos">
    <div class="infos__bloc">
      <!--Image du drapeau en mobile-->
      <img
        class="infos__img --mobile"
        src="/drapeau_italie.jpg"
        alt="image du drapeau du pays"
      />
      <!--Les informations-->
      <div class="infos__BigContent">
        <!--Capitale-->
        <div class="infos__content">
          <!--Icon du ping représentant la capitale-->
          <div class="infos__blocIcons">
            <IconsPing class="infos__icons" :color="colorText" />
          </div>
          <!--Titre capitale-->
          <p class="infos__text">{{ capitale }}</p>
        </div>
        <!--Superficie-->
        <div class="infos__content">
          <!--Icon représentant la superfiice-->
          <div class="infos__blocIcons">
            <IconsDistance class="infos__icons --distance" :color="colorText" />
          </div>
          <!--Titre superficie-->
          <p class="infos__text">{{ superficie }}</p>
        </div>
        <!--Population-->
        <div class="infos__content">
          <!--Icon représentant la population-->
          <div class="infos__blocIcons">
            <IconsPersonne class="infos__icons --personne" :color="colorText" />
          </div>
          <!--Titre population-->
          <p class="infos__text">{{ pop }}</p>
        </div>
        <!--Langue-->
        <div class="infos__content">
          <!--Icon représentant la langue-->
          <div class="infos__blocIcons">
            <IconsParole class="infos__icons --carre" :color="colorText" />
          </div>
          <!--Titre langue-->
          <p class="infos__text">{{ langue }}</p>
        </div>
        <!--Spécialité-->
        <div class="infos__content">
          <!--Icon représentant la spécialité-->
          <div class="infos__blocIcons">
            <IconsPlat class="infos__icons --plat" :color="colorText" />
          </div>
          <!--Titre Spécialité-->
          <p class="infos__text">{{ specialite }}</p>
        </div>
      </div>

      <!--Bloc contenant les images-->
      <div class="infos__imgs">
        <!--Image du drapeau en desktop-->
        <img
          class="infos__img --desktop"
          src="/drapeau_italie.jpg"
          alt="image du drapeau du pays"
        />
        <!--Image de la spécialité en desktop-->
        <img
          class="infos__img --desktop"
          src="/Pizza.jpg"
          alt="image de la spécialité du pays"
        />
      </div>
      <!--Image de la spécialité en mobile-->
      <img
        class="infos__img --mobile"
        src="/Pizza.jpg"
        alt="image de la spécialité du pays"
      />
    </div>
  </div>
</template>

<!--Styles de la carte informations du pays-->
<style lang="scss" scoped>
// Bloc général
.infos {
  @mixin only-small {
    width: 90%;
  }
  position: relative;
  margin: 0px auto;

  // Styles du bloc contenant les images
  &__imgs {
    display: none;
    @include medium-up {
      display: flex;
      flex-direction: column;
      gap: rem(30);
    }
  }

  // Styles du bloc contenant l'icon
  &__blocIcons {
    width: 60px;
    display: flex;
    justify-content: center;
  }

  // Styles des images
  &__img {
    width: rem(120);
    height: rem(80);
    @include medium-up {
      width: rem(160);
      height: rem(120);
    }

    &.--mobile {
      display: block;
      @include medium-up {
        display: none;
      }
    }

    &.--desktop {
      display: none;
      @include medium-up {
        display: block;
      }
    }
  }

  // Styles contenant les informations les icons et les images
  &__bloc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 30px 10px;
    gap: rem(30);
    margin: rem(0) auto;
    width: 40vh;

    @include medium-up {
      justify-content: space-evenly;
      flex-direction: row;
      padding: 30px 40px;
      width: 60vh;
      max-width: 50vh;
    }
    @include large-up {
      width: 70vh;
      margin-top: rem(50);
      max-width: 80vh;
    }
    @include x-large-up {
      width: 60vh;
      margin-top: rem(0);
    }
  }

  // Styles contenant 1 info et un icon
  &__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: rem(20);
    width: 100%;
    @include medium-up {
      gap: rem(30);
    }
  }

  // Styles contenant toutes les informations et les icons du pays
  &__BigContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: rem(20);
  }

  // Styles des textes
  &__text {
    color: v-bind(colorText);
    font-family: $secondary-font-family;
    font-size: rem(30);
    margin: rem(0);
    @include medium-up {
      font-size: $medium-font-size;
    }
  }

  // Styles de l'icon
  &__icons {
    width: 40px;
    height: 50px;

    @include medium-up {
      width: 46px;
      height: 60px;
    }

    // Styles de l'icon superficice
    &.--distance {
      width: rem(55);
      height: rem(45);
      @include medium-up {
        width: rem(65);
        height: rem(55);
      }
    }

    // Styles de l'icon population
    &.--personne {
      width: rem(65);
      height: rem(65);
      @include medium-up {
        width: rem(75);
        height: rem(75);
      }
    }

    // Styles de l'icon spécialité
    &.--plat {
      width: rem(55);
      height: rem(40);
      @include medium-up {
        width: rem(65);
        height: rem(50);
      }
    }

    // Styles des icons carré
    &.--carre {
      width: rem(50);
      height: rem(50);
      @include medium-up {
        width: rem(60);
        height: rem(60);
      }
    }
  }
}

// Styles du bloc de couleur
.infos__bloc::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: v-bind(color);
  opacity: 0.6;
  z-index: -1;
}
</style>

<!--Création des props img_drap contenant le lien avec l'image du drapeau
de img_spe contenant le lien vers l'image de la spécialité
de pop contenant l'information de la population
de superficie contenant l'information de la superficie
de capitale contenant le nom de la capitale
de specialite contenant le nom de la specialite
de langue contenant de nom de la langue officielle
de color contenant le code hexadécimal de la couleur du fond
de colorText contenant le code hexadécimal de la couleur du texte-->

<script setup>
// Importation de defineProps
import { defineProps } from "vue";

defineProps({
  img_dra: String,
  img_spe: String,
  pop: String,
  superficie: String,
  capitale: String,
  specialite: String,
  langue: String,
  color: String,
  colorText: String,
});
</script>
