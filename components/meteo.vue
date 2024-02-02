<template>
  <div class="meteo">
    <div class="meteo__content">
      <div style="display: flex; justify-content: center">
        <p class="meteo__text">
          Vous vous trouvez à {{ ville }} le temps est {{ weather }} et il fait
          {{ temp_act }}°C. Aujourd’hui, la température minimale chez vous sera
          de {{ temp_min }}°C et la température maximale de {{ temp_max }}°C.
        </p>
      </div>
      <div class="meteo__blocIcons">
        <div class="meteo__blocTemp">
          <!--Icon soleil-->
          <IconsSoleil
            v-if="icons === 'soleil'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <IconsNuage
            v-if="icons === 'nuage'"
            class="meteo__icon --nuage"
            :color="primaryColorText"
          />
          <IconsSoleil-nuage
            v-if="icons === 'soleil-nuage'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <IconsPluie
            v-if="icons === 'pluie'"
            class="meteo__icon --long"
            :color="primaryColorText"
          />
          <IconsNeige
            v-if="icons === 'neige'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <IconsOrage
            v-if="icons === 'orage'"
            class="meteo__icon"
            :color="primaryColorText"
          />
          <IconsBrouillard
            v-if="icons === 'brouillard'"
            class="meteo__icon --nuage"
            :color="primaryColorText"
          />
          <IconsCoeur
            v-if="icons === 'coeur'"
            class="meteo__icon --long"
            :color="primaryColorText"
          />
        </div>
        <!--Température minimale-->
        <div class="meteo__blocTemp">
          <IconsFleche_bas
            class="meteo__icon --fleche"
            :color="primaryColorText"
          />
          <p class="meteo__text --temp">{{ temp_min }}°C</p>
        </div>
        <!--Température minimale-->
        <div class="meteo__blocTemp">
          <IconsFleche_haut
            class="meteo__icon --fleche"
            :color="primaryColorText"
          />
          <p class="meteo__text --temp">{{ temp_max }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  &__blocTemp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8);
    @include medium-up {
      gap: rem(25);
    }
  }

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
import { defineProps, ref, onMounted, watch } from "vue";

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

const icons = ref("");

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

    case "légères chutes de neige":
      icons.value = "neige";
      break;

    case "chutes de neige importantes":
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

onMounted(() => {
  updateIcons();
});

watch(
  () => props.weather,
  () => {
    updateIcons();
  }
);
</script>
