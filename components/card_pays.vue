<template>
  <div class="pays">
    <div class="pays__entete">
      <!-- Titre du pays -->
      <div class="pays__back">
        <h2>{{ nom }}</h2>
        <!-- Informations de météo sur le pays -->
        <div class="pays__meteo">
          <!-- Heure du pays -->
          <div class="pays__hour">
            <IconsHorloge class="pays__icon" />
            <p class="pays__hourText">{{ formattedTime }}</p>
          </div>
          <div>
            <!--Icon soleil-->
            <IconsSoleil
              v-if="icon === 'soleil'"
              class="meteo__icon"
              color="#000000"
            />
            <IconsNuage
              v-if="icon === 'nuage'"
              class="meteo__icon --nuage"
              color="#000000"
            />
            <IconsSoleil-nuage
              v-if="icon === 'soleil-nuage'"
              class="meteo__icon"
              color="#000000"
            />
            <IconsPluie
              v-if="icon === 'pluie'"
              class="meteo__icon --long"
              color="#000000"
            />
            <IconsNeige
              v-if="icon === 'neige'"
              class="meteo__icon"
              color="#000000"
            />
            <IconsOrage
              v-if="icon === 'orage'"
              class="meteo__icon"
              color="#000000"
            />
            <IconsBrouillard
              v-if="icon === 'brouillard'"
              class="meteo__icon --nuage"
              color="#000000"
            />
            <IconsCoeur
              v-if="icon === 'coeur'"
              class="meteo__icon --long"
              color="#000000"
            />
          </div>
        </div>
      </div>
      <!-- Titre actualité -->
      <div class="pays__actualite">
        <h2>l'actua</h2>
        <h2>alité</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount, computed, defineProps } from "vue";

export default {
  props: {
    heure: String,
    nom: String,
    temp: String,
    weather: String,
    latitude: String,
    longitude: String,
  },

  setup(props) {
    let temp = ref("");
    let weather = ref("");
    let icon = ref("");

    const getEnseign = (latitude, longitude) => {
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
          // Handle the JSON response data here
          console.log(data);
          //données
          const meteo = document.getElementById("meteo");
          temp.value = data.main.temp;
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

            case "légères chutes de neige":
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

            case "bruine":
              icon.value = "brouillard";
              break;

            default:
              icon.value = "coeur";
              break;
          }

          // Use the data as needed in your application
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    };

    const time = ref({});

    const formattedTime = computed(() => {
      if (time.value.hours) {
        const [datePart, timePart] = time.value.hours.split("T");
        const [hours, minutes] = timePart.split(":").slice(0, 2);
        return `${hours}:${minutes}`;
      } else {
        return "";
      }
    });

    const fetchTime = () => {
      const apiUrl = `http://worldtimeapi.org/api/timezone/${props.heure}`;
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

    const startUpdatingTime = () => {
      fetchTime();
      updateInterval = setInterval(fetchTime, 60000);
    };

    onMounted(() => {
      startUpdatingTime();
      getEnseign(props.latitude, props.longitude);
    });

    onBeforeUnmount(() => {
      clearInterval(updateInterval);
    });

    return {
      time,
      formattedTime,
      icon,
    };
  },
};
</script>

<style lang="scss" scoped>
.pays {
  margin: 0;
  padding: 50px 0px;
  height: 300vh;
  overflow: hidden;
  position: relative;

  background-image: url("/Italie.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  &__icon {
    @include large-up {
      width: 50px;
      height: 50px;
    }
  }

  &__hour {
    display: flex;
    align-items: center;
    font-family: $secondary-font-family;
    font-size: $big-font-size;
    margin: 0px;
    justify-content: space-around;
  }

  &__back {
    background-color: hsla(0, 0%, 100%, 0.6);
    width: fit-content;
    font-family: $secondary-font-family;
    font-size: $bigger-font-size;

    @include large-up {
      padding: 20px 30px;
    }
  }

  &__actualite {
    font-size: $bigger-font-size;
    font-family: $primary-font-family;
    color: $secondary-color;
    text-transform: uppercase;
    @include large-up {
      font-size: $giant-font-size;
      line-height: 50px;
    }
    @include x-large-up {
      font-size: $gianter-font-size;
      line-height: 50px;
    }
  }

  &__entete {
    display: flex;
    flex-direction: column;
    @include large-up {
      flex-direction: row;
      justify-content: space-evenly;
    }
  }

  &__meteo {
  }
}
</style>
