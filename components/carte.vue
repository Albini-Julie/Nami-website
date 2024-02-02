<template>
  <div style="height: 100vh; display: flex; align-items: center; width: 100%¨">
    <LMap ref="map" :zoom="zoom" :center="[0, 0]" :options="mapOptions">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />

      <!-- Ajouter des marqueurs -->
      <!--Marqeur de l'utilisateur-->
      <LMarker :lat-lng="[latitudeUti, longitudeUti]" :icon="customIconUti">
        <LTooltip
          class="custom-tooltip"
          :content="`Vous vous trouvez ici, à ${ville}`"
        ></LTooltip>
      </LMarker>
      <!--Marqeur de la première capitale-->
      <LMarker :lat-lng="[latitude1, longitude1]" :icon="customIcon">
        <LTooltip
          :content="`Vous vous trouvez à ${distance1} km de ${capitale1}`"
        ></LTooltip>
      </LMarker>
      <!--Marqeur de la deuxième capitale-->
      <LMarker :lat-lng="[latitude2, longitude2]" :icon="customIcon">
        <LTooltip
          :content="`Vous vous trouvez à ${distance2} km de ${capitale2}`"
        ></LTooltip>
      </LMarker>
      <!--Marqeur de la troisème capitale-->
      <LMarker :lat-lng="[latitude3, longitude3]" :icon="customIcon">
        <LTooltip
          :content="`Vous vous trouvez à ${distance3} km de ${capitale3}`"
        ></LTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

<style lang="scss" scoped>
body {
  margin: 0;
}
</style>

<script setup>
import { ref, defineProps, onMounted } from "vue";
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

const props = defineProps([
  "primaryColor",
  "secondaryColor",
  "primaryColorText",
  "secondaryColorText",
  "latitudeUti",
  "longitudeUti",
  "ville",
]);

// Customisation des marqueurs (changement de couleurs)
const iconUti = ref("");
console.log(props.secondaryColor);
switch (props.secondaryColor) {
  case "#00FFA3":
    iconUti.value = "/marqueurs/vert_eau.png";
    break;
  case "#FF8A00":
    iconUti.value = "/marqueurs/orange.png";
    break;
  case "#FFC700":
    iconUti.value = "/marqueurs/orange_clair.png";
    break;
  case "#DB00FF":
    iconUti.value = "/marqueurs/violet_clair.png";
    break;
  case "#001F8B":
    iconUti.value = "/marqueurs/bleu_marine.png";
    break;
  case "#7A7A7A":
    iconUti.value = "/marqueurs/gris.png";
    break;
  default:
    iconUti.value = "/marqueurs/jaune_fonce.png";
    break;
}

const customIconUti = L.icon({
  iconUrl: iconUti.value, // Utilisez le chemin correct vers votre icône
  iconSize: [30, 45], // Ajustez la taille de l'icône selon vos besoins
  iconAnchor: [15, 45], // Ajustez l'ancre de l'icône selon vos besoins
  popupAnchor: [0, -25], // Ajustez l'ancre du popup selon vos besoins
});

const iconCap = ref("");
switch (props.primaryColor) {
  case "#FF0099":
    iconCap.value = "/marqueurs/rose.png";
    break;
  case "#AD00FF":
    iconCap.value = "/marqueurs/violet.png";
    break;
  case "#001AFF":
    iconCap.value = "/marqueurs/bleu_fonce.png";
    break;
  case "#FAFF00":
    iconCap.value = "/marqueurs/jaune_clair.png";
    break;
  case "#FF63DD":
    iconCap.value = "/marqueurs/rose_clair.png";
    break;
  case "#00FFFF":
    iconCap.value = "/marqueurs/bleu_clair.png";
    break;
  default:
    iconCap.value = "/marqueurs/rouge.png";
    break;
}

const customIcon = L.icon({
  iconUrl: iconCap.value, // Utilisez le chemin correct vers votre icône
  iconSize: [30, 45], // Ajustez la taille de l'icône selon vos besoins
  iconAnchor: [15, 45], // Ajustez l'ancre de l'icône selon vos besoins
  popupAnchor: [0, -25], // Ajustez l'ancre du popup selon vos besoins
});

// zoom de la carte au début
const zoom = ref(3);

const mapOptions = {
  dragging: true,
  touchZoom: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
};

// Fonction pour convertir les degrés en radians
let deg2rad = (deg) => deg * (Math.PI / 180);

// Fonction pour calculer la distance haversine entre deux points
let haversine = (lat1, lon1, lat2, lon2) => {
  console.log(lat1, lat2, lon1, lon2);
  let R = 6371; // Rayon de la Terre en kilomètres
  let dLat = deg2rad(lat2 - lat1);
  let dLon = deg2rad(lon2 - lon1);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance = R * c; // Distance en kilomètres

  return distance;
};

// Arrondir à l'unité supérieure si chiffre après la virgule >= 0.5 et arrondir à l'unité inférieure si chiffre après la virgule < à 0.5
let roundDistance = (distance) => {
  let roundedDistance = Math.floor(distance); // Arrondir à l'unité inférieure par défaut

  // Si la partie décimale est égale ou supérieure à 0.5, arrondir à l'unité supérieure
  if (distance % 1 >= 0.5) {
    return Math.ceil(distance);
  }

  return roundedDistance;
};

const distance1 = ref(null);
const distance2 = ref(null);
const distance3 = ref(null);

onMounted(() => {
  // Conversion des coordonnées en float
  let latUti = parseFloat(props.latitudeUti);
  let lonUti = parseFloat(props.longitudeUti);
  let lat1 = parseFloat(latitude1.value);
  let lon1 = parseFloat(longitude1.value);

  // Calculating distances after ensuring the values are defined
  distance1.value = roundDistance(haversine(latUti, lonUti, lat1, lon1));
  console.log("Distance 1:", distance1.value);

  // Rest of the distance calculations
  let lat2 = parseFloat(latitude2.value);
  let lon2 = parseFloat(longitude2.value);
  let lat3 = parseFloat(latitude3.value);
  let lon3 = parseFloat(longitude3.value);

  distance2.value = roundDistance(haversine(latUti, lonUti, lat2, lon2));
  console.log("Distance 2:", distance2.value);
  distance3.value = roundDistance(haversine(latUti, lonUti, lat3, lon3));
  console.log("Distance 3:", distance3.value);
});
</script>
