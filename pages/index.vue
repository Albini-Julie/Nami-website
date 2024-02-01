<template>
  <introduction
    :primaryColor="primaryColor"
    :secondaryColor="secondaryColor"
    :primaryColorText="primaryColorText"
    :secondaryColorText="secondaryColorText"
  />
  <meteo
    :primaryColor="primaryColor"
    :secondaryColor="secondaryColor"
    :primaryColorText="primaryColorText"
    :secondaryColorText="secondaryColorText"
    :ville="ville"
    :temp_act="temp_act"
    :temp_min="temp_min"
    :temp_max="temp_max"
    :weather="weather"
  />
  <pays
    :primaryColor="primaryColor"
    :secondaryColor="secondaryColor"
    :primaryColorText="primaryColorText"
    :secondaryColorText="secondaryColorText"
  />
  <question :color="secondaryColor" :colorText="secondaryColorText" />
  <carte
    v-if="showMap"
    :secondaryColor="secondaryColor"
    :primaryColor="primaryColor"
    :latitudeUti="coordMe.latitude"
    :longitudeUti="coordMe.longitude"
    :ville="ville"
  />
</template>

<script setup>
//import éléments de vue
import { reactive, ref } from "vue";
import {
  latitude1,
  latitude2,
  latitude3,
  longitude1,
  longitude2,
  longitude3,
  capitale1,
  capitale2,
  capitale3,
} from "@/config.js";

const showMap = ref(false);

let primaryColor = ref("#D00000");
let secondaryColor = ref("#FFF500");
let primaryColorText = ref("#FFFFFF");
let secondaryColorText = ref("#000000");
let ville = ref("");
let temp_act = ref("");
let temp_min = ref("");
let temp_max = ref("");
let weather = ref("");

const coordMe = reactive({ latitude: 0, longitude: 0 });

//Fonction de détection de la géolocalisation via navigateur
const locMe = () => {
  navigator.geolocation.watchPosition(
    //fonction à appeler en cas de success
    showLocation
  );
};
//Fonction de sa localisation si elle réussit
const showLocation = (position) => {
  //Récupération latitude et longitude
  coordMe.latitude = position.coords.latitude;
  coordMe.longitude = position.coords.longitude;

  // Appel de la fonction pour obtenir les données météo
  getEnseign(coordMe.latitude, coordMe.longitude);
};

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
      temp_act.value = data.main.temp;
      temp_min.value = data.main.temp_min;
      temp_max.value = data.main.temp_max;
      weather.value = data.weather[0].description;

      ville.value = data.name;
      //changement de la couleur

      switch (weather.value) {
        case "couvert":
          primaryColor.value = "#AD00FF";
          secondaryColor.value = "#00FFA3";
          primaryColorText.value = "#FFFFFF";
          secondaryColorText.value = "#000000";
          break;

        case "nuageux":
          primaryColor.value = "#AD00FF";
          secondaryColor.value = "#00FFA3";
          primaryColorText.value = "#FFFFFF";
          secondaryColorText.value = "#000000";
          break;

        case "partiellement nuageux":
          primaryColor.value = "#FF0099";
          secondaryColor.value = "#FF8A00";
          primaryColorText.value = "#FFFFFF";
          secondaryColorText.value = "#000000";
          break;

        case "peu nuageux":
          primaryColor.value = "#FF0099";
          secondaryColor.value = "#FF8A00";
          primaryColorText.value = "#FFFFFF";
          secondaryColorText.value = "#000000";
          break;

        case "légère pluie":
          primaryColor.value = "#FAFF00";
          secondaryColor.value = "#DB00FF";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "pluie modérée":
          primaryColor.value = "#FAFF00";
          secondaryColor.value = "#DB00FF";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "forte pluie":
          primaryColor.value = "#FAFF00";
          secondaryColor.value = "#DB00FF";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "légères chutes de neige":
          primaryColor.value = "#FF63DD";
          secondaryColor.value = "#001F8B";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "chutes de neige importantes":
          primaryColor.value = "#FF63DD";
          secondaryColor.value = "#001F8B";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "chutes de neige modérées":
          primaryColor.value = "#FF63DD";
          secondaryColor.value = "#001F8B";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "orage":
          primaryColor.value = "#001AFF";
          secondaryColor.value = "#FFC700";
          primaryColorText.value = "#FFFFFF";
          secondaryColorText.value = "#000000";
          break;

        case "brouillard":
          primaryColor.value = "#00FFFF";
          secondaryColor.value = "#7A7A7A";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "brume":
          primaryColor.value = "#00FFFF";
          secondaryColor.value = "#7A7A7A";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "bruine":
          primaryColor.value = "#00FFFF";
          secondaryColor.value = "#7A7A7A";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "bruine légère":
          primaryColor.value = "#00FFFF";
          secondaryColor.value = "#7A7A7A";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        case "fumée":
          primaryColor.value = "#00FFFF";
          secondaryColor.value = "#7A7A7A";
          primaryColorText.value = "#000000";
          secondaryColorText.value = "#FFFFFF";
          break;

        default:
          primaryColor.value = "#D00000";
          secondaryColor.value = "#FFF500";
          primaryColorText.value = "#FFFFFF";
          secondaryColorText.value = "#000000";
          break;
      }

      // Use the data as needed in your application
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
};

// Utilisation de onMounted pour appeler locMe dès que le composant est monté
onMounted(() => {
  locMe();
  setTimeout(() => {
    showMap.value = true;
  }, 2500);
});
</script>
