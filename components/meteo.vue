<!--Intégration de la partie météo-->
<template>
  <!--Bloc contenant toute la partie météo-->
  <div class="meteo">
    <!--Bloc contenant le contenu de la page-->
    <div class="meteo__content">
      <!--Bloc contenant la phrase-->
      <div style="display: flex; justify-content: center">
        <p class="meteo__text">
          Vous vous trouvez à {{ ville }} le temps est {{ weather }} et il fait
          {{ temp_act }}°C. Aujourd’hui, la température minimale chez vous sera
          de {{ temp_min }}°C et la température maximale de {{ temp_max }}°C.
        </p>
      </div>
      <!--Bloc contenant les icons météo et température-->
      <div class="meteo__blocIcons">
        <div class="meteo__blocTemp">
          <!--Icon soleil-->
          <IconsSoleil
            v-if="icons === 'soleil'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <!--Icon nuage-->
          <IconsNuage
            v-if="icons === 'nuage'"
            class="meteo__icon --nuage"
            :color="primaryColorText"
          />
          <!--Icon soleil-nuage-->
          <IconsSoleil-nuage
            v-if="icons === 'soleil-nuage'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <!--Icon pluie-->
          <IconsPluie
            v-if="icons === 'pluie'"
            class="meteo__icon --long"
            :color="primaryColorText"
          />
          <!--Icon neige-->
          <IconsNeige
            v-if="icons === 'neige'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <!--Icon orage-->
          <IconsOrage
            v-if="icons === 'orage'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <!--Icon brouillard-->
          <IconsBrouillard
            v-if="icons === 'brouillard'"
            class="meteo__icon --nuage"
            :color="primaryColorText"
          />
          <!--Icon coeur-->
          <IconsCoeur
            v-if="icons === 'coeur'"
            class="meteo__icon --long"
            :color="primaryColorText"
          />
        </div>
        <!-- Bloc température minimale-->
        <div class="meteo__blocTemp">
          <!--Icon fleche du bas-->
          <IconsFleche_bas
            class="meteo__icon --fleche"
            :color="primaryColorText"
          />
          <!--Température minimale-->
          <p class="meteo__text --temp">{{ temp_min }}°C</p>
        </div>
        <!--Bloc température maximale-->
        <div class="meteo__blocTemp">
          <!--Icon fleche du haut-->
          <IconsFleche_haut
            class="meteo__icon --fleche"
            :color="primaryColorText"
          />
          <!--Température maximale-->
          <p class="meteo__text --temp">{{ temp_max }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Styles du bloc contenant toute la partie météo
.meteo {
  height: fit-content;
  width: 100%;
  background-color: v-bind(primaryColor);
  padding-top: 20%;
  padding-bottom: 20%;

  @include large-up {
    padding-top: 10%;
    padding-bottom: 10%;
    height: 100vh;
    display: flex;
    justify-content: center;
  }
  @include x-large-up {
  }

  // Styles du bloc contenant le contenu de la partie météo
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include large-up {
      width: 80%;
      flex-direction: row;
      height: 100vh;
      gap: rem(50);
    }
  }

  // Styles du bloc contenant les icons météo et température
  &__blocIcons {
    display: flex;
    justify-content: center;
    gap: 10px;
    @include medium-up {
      gap: 20px;
    }
    @include large-up {
      justify-content: space-around;
      display: flex;
      flex-direction: column;
      height: 70%;
    }
  }

  // Styles des icons
  &__icon {
    width: rem(60);
    height: rem(60);
    @include medium-up {
      width: rem(85);
      height: rem(85);
    }
    @include large-up {
      width: rem(120);
      height: rem(120);
    }
    @include x-large-up {
      width: rem(150);
      height: rem(150);
    }

    // Styles des icons en longeur
    &.--long {
      width: rem(60);
      height: rem(50);
      @include medium-up {
        width: rem(80);
        height: rem(70);
      }
      @include large-up {
        width: rem(130);
        height: rem(110);
      }
      @include x-large-up {
        width: rem(150);
        height: rem(130);
      }
    }

    // Styles du l'icon nuage
    &.--nuage {
      width: rem(70);
      height: rem(50);
      @include medium-up {
        width: rem(110);
        height: rem(70);
      }
      @include large-up {
        width: rem(160);
        height: rem(110);
      }
      @include x-large-up {
        width: rem(180);
        height: rem(130);
      }
    }

    // Styles des icons fleches
    &.--fleche {
      width: rem(35);
      height: rem(35);
      @include medium-up {
        width: rem(55);
        height: rem(55);
      }
      @include large-up {
        width: rem(80);
        height: rem(80);
      }
      @include x-large-up {
        width: rem(80);
        height: rem(80);
      }
    }
  }

  // Styles du bloc contenant une température et son icon
  &__blocTemp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8);
    @include medium-up {
      gap: rem(25);
    }
  }

  // Styles des textes
  &__text {
    color: v-bind(primaryColorText);
    font-family: $primary-font-family;
    font-size: $big-font-size;
    width: 85%;
    font-size: 40px;
    @include medium-up {
      font-size: 50px;
    }
    @include large-up {
      width: fit-content;
      width: 85%;
      font-size: 55px;
    }

    @include x-large-up {
      font-size: 70px;
    }

    // Styles des textes des témpératures
    &.--temp {
      font-size: 30px;
      @include medium-up {
        font-size: 40px;
      }
      @include large-up {
        font-size: 50px;
      }
    }
  }
}

//curseur
</style>

<script setup>
// Importation des outils utiles
import { defineProps, ref, onMounted, watch } from "vue";

//Création des props
// primaryColor contient le code hexadécimal de la première couleur à utiliser pour le contenu
// secondaryColor contient le code hexadécimal de la seconde couleur à utiliser pour le contenu
// primaryColorText contient le code hexadécimal de la couleur à utiliser pour le texte du contenu utilisant primaryColor
// secondaryColorText contient le code hexadécimal de la couleur à utiliser pour le texte du contenu utilisant secondaryColor
// ville contient le nom de la ville où se trouve l'utilisateur
// temp_act contient la température qui fait actuellement chez l'utilisateur
// temp_min contient la température qu'il fera au minimum chez l'utilisateur
// temp_max contient la température qu'il fera au maximum chez l'utilisateur
// weahter contient le temps qu'il fait chez l'utilisateur
const props = defineProps({
  primaryColor: String,
  secondaryColor: String,
  primaryColorText: String,
  secondaryColorText: String,
  ville: String,
  temp_act: Number,
  temp_min: Number,
  temp_max: Number,
  weather: String,
});

// Création d'une ref icon qui contiendra le nom de l'icon météo à afficher
const icons = ref("");

// Choix de l'icon à afficher en fonction de la valeur de la props weather
const updateIcons = () => {
  switch (props.weather) {
    case "ciel dégagé":
      icons.value = "soleil";
      break;

    case "couvert":
      icons.value = "nuage";
      break;

    case "nuageux":
      icons.value = "nuage";
      break;

    case "partiellement nuageux":
      icons.value = "soleil-nuage";
      break;

    case "peu nuageux":
      icons.value = "soleil-nuage";
      break;

    case "légère pluie":
      icons.value = "pluie";
      break;

    case "pluie modérée":
      icons.value = "pluie";
      break;

    case "forte pluie":
      icons.value = "pluie";
      break;

    case "petites averses":
      icons.value = "pluie";
      break;

    case "légères chutes de neige":
      icons.value = "neige";
      break;

    case "chutes de neige importantes":
      icons.value = "neige";
      break;

    case "chutes de neige":
      icons.value = "neige";
      break;

    case "chutes de neige modérées":
      icons.value = "neige";
      break;

    case "orage":
      icons.value = "orage";
      break;

    case "brouillard":
      icons.value = "brouillard";
      break;

    case "brume":
      icons.value = "brouillard";
      break;

    case "brume sèche":
      icons.value = "brouillard";
      break;

    case "bruine":
      icons.value = "brouillard";
      break;

    case "bruine légère":
      icons.value = "brouillard";
      break;

    case "fumée":
      icons.value = "brouillard";
      break;

    default:
      icons.value = "coeur";
      break;
  }
};

// Au montage du composant on appelle updateIcons()
onMounted(() => {
  updateIcons();
});

// On vérifie souvent la valeur de la props weather pour changer en temps réel l'icon météo
watch(
  () => props.weather,
  () => {
    updateIcons();
  }
);
</script>
