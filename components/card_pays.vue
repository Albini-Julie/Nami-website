<template>
  <div class="pays">
    <div class="pays__entete">
      <!-- Titre du pays -->
      <div class="pays__title">
        <h2>{{ nom }}</h2>
        <!-- Informations de météo sur le pays -->
        <div class="pays__meteo">
          <!-- Heure du pays -->
          <div>
            <p>{{ formattedTime }}</p>
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
  },

  setup(props) {
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

    const startUpdatingTime = () => {
      fetchTime();
      setInterval(fetchTime, 60000);
    };

    onMounted(() => {
      startUpdatingTime();
    });

    onBeforeUnmount(() => {
      clearInterval(updateInterval);
    });

    return {
      time,
      formattedTime,
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

  &__title {
    background-color: $secondary-color;
    opacity: 60%;
    width: fit-content;

    @include large-up {
      padding: 20px 30px;
      font-family: $secondary-font-family;
      font-size: $bigger-font-size;
    }
  }

  &__actualite {
    @include large-up {
      font-family: $primary-font-family;
      font-size: $gianter-font-size;
      color: $secondary-color;
      text-transform: uppercase;
      line-height: 50px;
    }
  }

  &__entete {
    display: flex;
    justify-content: space-evenly;
  }

  &__meteo {
    display: flex;
    justify-content: space-between;
  }
}
</style>
