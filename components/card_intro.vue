<!--Intégration de la card intro-->
<template>
  <!--Bloc général-->
  <div class="pays">
    <!--Bloc contenant l'entete de la card Pays (infos + actualité)-->
    <div class="pays__entete">
      <!--Bloc contenant les infos sur le pays-->
      <div class="pays__back">
        <!-- Titre du pays -->
        <h2 class="pays__title">{{ nom }}</h2>
        <!-- Informations heure + météo du pays -->
        <div class="pays__meteo">
          <!-- Bloc heure -->
          <div class="pays__donnees">
            <!--Icon représentant l'heure-->
            <IconsHorloge class="pays__icon" />
            <!--Heure du pays-->
            <p class="pays__text">{{ formattedTime }}</p>
          </div>
          <!--Bloc météo-->
          <div class="pays__donnees">
            <!--Icon Soleil-->
            <IconsSoleil
              v-if="icon === 'soleil'"
              class="pays__icon"
              color="#000000"
            />
            <!--Icon Nuage-->
            <IconsNuage
              v-if="icon === 'nuage'"
              class="pays__icon --nuage"
              color="#000000"
            />
            <!--Icon Soleil-Nuage-->
            <IconsSoleil-nuage
              v-if="icon === 'soleil-nuage'"
              class="pays__icon"
              color="#000000"
            />
            <!--Icon Pluie-->
            <IconsPluie
              v-if="icon === 'pluie'"
              class="pays__icon --long"
              color="#000000"
            />
            <!--Icon Neige-->
            <IconsNeige
              v-if="icon === 'neige'"
              class="pays__icon"
              color="#000000"
            />
            <!--Icon Orage-->
            <IconsOrage
              v-if="icon === 'orage'"
              class="pays__icon"
              color="#000000"
            />
            <!--Icon Brouillard-->
            <IconsBrouillard
              v-if="icon === 'brouillard'"
              class="pays__icon --nuage"
              color="#000000"
            />
            <!--Icon Coeur-->
            <IconsCoeur
              v-if="icon === 'coeur'"
              class="pays__icon --long"
              color="#000000"
            />
            <!--Température-->
            <p class="pays__text">{{ temp }}°C</p>
          </div>
        </div>
      </div>
      <!-- Titre actualité -->
      <div class="pays__actualite">
        <h2 style="margin: 0px">l'actu</h2>
        <h2 style="margin: 0px">alité</h2>
      </div>
    </div>
  </div>
</template>

<script>
// Importation des outils
import axios from "axios";
import { ref, onMounted, onBeforeUnmount, computed, defineProps } from "vue";

// Création des props
// heure contient la localisation du pays permettant la récupération de l'heure
// nom contient le nom du pays
// temp contient la température du pays
// latitude contient la latitude du pays
// longitude contient la longitude du pays
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
  },

  setup(props) {
    // Création de variables
    // temp contiendra la température du pays
    // weather contiendra le temps du pays
    // icon contiendra le nom de l'icon a afficher
    let temp = ref("");
    let weather = ref("");
    let icon = ref("");

    // Fonction qui récupère la météo dans le pays pour déterminer l'icon a afficher
    const getEnseign = (latitude, longitude) => {
      // Requête vers l'API OpenWeatherMap
      fetch(
        //`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&appid=50c7f1c20b813764c0e648ea2b791165&units=metric`
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&appid=50c7f1c20b813764c0e648ea2b791165&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          //données
          const meteo = document.getElementById("meteo");
          // Récupération de la temprature du pays dans la ref temp
          temp.value = data.main.temp;

          // Récupération de la météo du pays dans la ref weather
          weather.value = data.weather[0].description;

          //changement de l'icon
          switch (weather.value) {
            case "ciel dégagé":
              icon.value = "soleil";
              break;

            case "couvert":
              icon.value = "nuage";
              break;

            case "nuageux":
              icon.value = "nuage";
              break;

            case "partiellement nuageux":
              icon.value = "soleil-nuage";
              break;

            case "peu nuageux":
              icon.value = "soleil-nuage";
              break;

            case "légère pluie":
              icon.value = "pluie";
              break;

            case "pluie modérée":
              icon.value = "pluie";
              break;

            case "forte pluie":
              icon.value = "pluie";
              break;

            case "petites averses":
              icon.value = "pluie";
              break;

            case "légères chutes de neige":
              icon.value = "neige";
              break;

            case "chutes de neige":
              icon.value = "neige";
              break;

            case "chutes de neige importantes":
              icon.value = "neige";
              break;

            case "chutes de neige modérées":
              icon.value = "neige";
              break;

            case "orage":
              icon.value = "orage";
              break;

            case "brouillard":
              icon.value = "brouillard";
              break;

            case "brume":
              icon.value = "brouillard";
              break;

            case "brume sèche":
              icon.value = "brouillard";
              break;

            case "bruine légère":
              icon.value = "brouillard";
              break;

            case "bruine":
              icon.value = "brouillard";
              break;

            case "fumée":
              icon.value = "brouillard";
              break;

            default:
              icon.value = "coeur";
              break;
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    };

    // Création d'une ref time qui contiendra l'heure du pays
    const time = ref({});

    // Récupération de l'heure sous le format heure/minutes
    const formattedTime = computed(() => {
      if (time.value.hours) {
        const [datePart, timePart] = time.value.hours.split("T");
        const [hours, minutes] = timePart.split(":").slice(0, 2);
        return `${hours}:${minutes}`;
      } else {
        return "";
      }
    });

    // Requête vers l'API WorldTime pour avoir l'heure du pays avec la props heure contenant la localisation du pays
    // Enregistrement de la valeur dans la ref time
    const fetchTime = () => {
      const apiUrl = `https://worldtimeapi.org/api/timezone/${props.heure}`;
      axios
        .get(apiUrl)
        .then((response) => {
          time.value = {
            hours: response.data.datetime,
          };
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'heure", error);
        });
    };

    let updateInterval;

    // Appel de la fonction fetchtime toutes les minutes pour avoir l'heure en temps réel
    const startUpdatingTime = () => {
      fetchTime();
      updateInterval = setInterval(fetchTime, 60000);
    };

    // Appel des fonctions startUpdateingTime et getEnseign à chaque fois que le composant est monté pour obtenir la météo et l'heure du pays
    onMounted(() => {
      startUpdatingTime();
      getEnseign(props.latitude, props.longitude);
    });

    // Suppression de l'interval créé par setInterval avant de démonté le composant
    onBeforeUnmount(() => {
      clearInterval(updateInterval);
    });

    // On récupère les variables pour les utiliser ensuite dans le template
    return {
      time,
      formattedTime,
      icon,
      temp,
    };
  },
};
</script>

<!--Styles de la card intro-->
<style lang="scss" scoped>
// Styles du bloc contenant la card intro
.pays {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include large-up {
    display: block;
  }

  // Styles du texte
  &__text {
    font-family: $secondary-font-family;
    font-size: rem(30);
    @include medium-up {
      font-size: $big-font-size;
    }
    @include large-up {
      font-size: $big-font-size;
    }
    @include x-large-up {
      font-size: rem(50);
    }
  }

  // Styles des icons
  &__icon {
    width: 39px;
    height: 39px;
    @include large-up {
      width: 50px;
      height: 50px;
    }

    // Styles de l'icon nuage
    &.--nuage {
      width: 55px;
      height: 39px;
      @include large-up {
        width: 70px;
        height: 50px;
      }
    }

    // Styles des icons en longueurs
    &.long {
      width: 39px;
      height: 39px;
      @include large-up {
        width: 50px;
        height: 50px;
      }
    }
  }

  // Bloc blanc
  &__back {
    background-color: hsla(0, 0%, 100%, 0.6);
    width: fit-content;
    height: fit-content;
    margin: 0px;
    padding: 5px 40px;
    @include medium-up {
      padding: 20px 90px;
    }
    @include large-up {
      padding: 15px 40px;
    }
    @include large-up {
      padding: 15px 80px;
    }
  }

  // Styles des titres
  &__title {
    margin: 0px;
    font-family: $secondary-font-family;
    font-size: rem(50);
    display: flex;
    justify-content: center;
    @include medium-up {
      font-size: rem(75);
    }
    @include large-up {
      font-size: rem(65);
    }
    @include x-large-up {
      font-size: rem(110);
    }
  }

  // Styles du titre Actualité
  &__actualite {
    display: none;
    font-size: $bigger-font-size;
    font-family: $primary-font-family;
    color: $secondary-color;
    text-transform: uppercase;
    font-size: rem(70);

    @include medium-up {
      font-size: $bigger-font-size;
    }
    @include large-up {
      font-size: rem(80);

      display: block;
    }
    @include x-large-up {
      font-size: $gianter-font-size;
    }
  }

  // Styles du bloc contenant l'ensemble des données de card intro
  &__entete {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include large-up {
      flex-direction: row;
      justify-content: space-evenly;
      align-items: flex-start;
    }
    @include x-large-up {
      justify-content: space-evenly;
      align-items: center;
    }
  }

  // Bloc contenant les icons ou les données de l'heure
  &__donnees {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: rem(10);
    @include large-up {
      gap: rem(10);
    }
    @include x-large-up {
      gap: rem(20);
    }
  }

  // Bloc contenant les données de la météo et de la température
  &__meteo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: rem(20);
    @include large-up {
      gap: rem(20);
    }
    @include x-large-up {
      gap: rem(80);
    }
  }
}
</style>
