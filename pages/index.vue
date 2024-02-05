<template>
  <!--Importation du composant introduction-->
  <introduction
    :primaryColor="primaryColor"
    :secondaryColor="secondaryColor"
    :primaryColorText="primaryColorText"
    :secondaryColorText="secondaryColorText"
  />
  <!--Importation du composant meteo-->
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
  <!--Importation du composant pays-->
  <pays
    :primaryColor="primaryColor"
    :secondaryColor="secondaryColor"
    :primaryColorText="primaryColorText"
    :secondaryColorText="secondaryColorText"
  />
  <!--Importation du composant question-->
  <question :color="secondaryColor" :colorText="secondaryColorText" />
  <!--Importation du composant carte-->
  <carte
    v-if="showMap"
    :secondaryColor="secondaryColor"
    :primaryColor="primaryColor"
    :latitudeUti="coordMe.latitude"
    :longitudeUti="coordMe.longitude"
    :ville="ville"
  />
  <!--Importation du composant footer-->
  <Footer titre="Mentions légales" lien="/mentionslegales" />
</template>

<script setup>
//import éléments de vue
import { reactive, ref } from "vue";

// Création d'une ref showMap qui permet de gérer l'affichage de la map
const showMap = ref(false);

// Création de ref
// primaryColor contient le code hexadécimal de la première couleur du contenu, ici elle a une valeur par défaut
// secondaryColor contient le code hexadécimal de la seconde couleur du contenu, ici elle a une valeur par défaut
// primaryColorText contient le code hexadécimal de la couleur à utiliser pour les textes du contenu primaryColor, ici elle a une valeur par défaut
// secondaryColorText contient le code hexadécimal de la couleur à utiliser pour les textes du contenu secondaryColor, ici elle a une valeur par défaut
// ville contient le nom de la ville où se trouve l'utilisateur
// temp_act contient la température actuelle chez l'utilisateur
// temp_min contient la température minimale qu'il fera chez l'utilisateur
// temp_max contient la température maximale qu'il fera chez l'utilisateur
// weather contient la météo qu'il fait chez l'utilisateur
let primaryColor = ref("#D00000");
let secondaryColor = ref("#FFF500");
let primaryColorText = ref("#FFFFFF");
let secondaryColorText = ref("#000000");
let ville = ref("");
let temp_act = ref("");
let temp_min = ref("");
let temp_max = ref("");
let weather = ref("");

// Création de coordMe qui contiendra les données de géolication de l'utilisateur
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
  //Récupération latitude et longitude de l'utilisateur
  coordMe.latitude = position.coords.latitude;
  coordMe.longitude = position.coords.longitude;

  // Appel de la fonction pour obtenir les données météo
  getEnseign(coordMe.latitude, coordMe.longitude);
};

// Récupération des données de météo de l'utilisateur
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
      // Récupération de la température actuelle dans temp_act
      temp_act.value = data.main.temp;
      // Récupération de la température minimale dans temp_min
      temp_min.value = data.main.temp_min;
      // Récupération de la température maximale dans temp_max
      temp_max.value = data.main.temp_max;
      // Récupération de la météo dans weather
      weather.value = data.weather[0].description;
      //Récupération du nom de la ville dans ville
      ville.value = data.name;

      //changement de la couleur selon la météo (valeur de weather)
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

        case "chutes de neige":
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

        case "brume sèche":
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
  }, 3000);
});
</script>
