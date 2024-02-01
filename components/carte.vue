<template>
  <div style="height: 100vh; width: 100%¨">
    <LMap ref="map" :zoom="zoom" :center="[0, 0]">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />

      <!-- Ajouter des marqueurs -->
      <!--Marqeur de l'utilisateur-->
      <LMarker :lat-lng="[latitudeUti, longitudeUti]">
        <LTooltip :content="`Vous vous trouvez ici, à ${ville}`"></LTooltip>
      </LMarker>
      <!--Marqeur de la première capitale-->
      <LMarker :lat-lng="[latitude1, longitude1]">
        <LTooltip
          :content="`Vous vous trouvez à ${distance1} km de ${capitale1}`"
        ></LTooltip>
      </LMarker>
      <!--Marqeur de la deuxième capitale-->
      <LMarker :lat-lng="[latitude2, longitude2]">
        <LTooltip
          :content="`Vous vous trouvez à ${distance2} km de ${capitale2}`"
        ></LTooltip>
      </LMarker>
      <!--Marqeur de la troisème capitale-->
      <LMarker :lat-lng="[latitude3, longitude3]">
        <LTooltip
          :content="`Vous vous trouvez à ${distance3} km de ${capitale3}`"
        ></LTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

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

const zoom = ref(2);

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

// Conversion des coordonnées en float
let latUti = parseFloat(props.latitudeUti);
let lonUti = parseFloat(props.longitudeUti);
let lat1 = parseFloat(latitude1.value);
let lon1 = parseFloat(longitude1.value);
let lat2 = parseFloat(latitude2.value);
let lon2 = parseFloat(longitude2.value);
let lat3 = parseFloat(latitude3.value);
let lon3 = parseFloat(longitude3.value);

// Arrondir à l'unité supérieure si chiffre après la virgule >= 0.5 et arrondir à l'unité inférieure si chiffre après la virgule < à 0.5
let roundDistance = (distance) => {
  let roundedDistance = Math.floor(distance); // Arrondir à l'unité inférieure par défaut

  // Si la partie décimale est égale ou supérieure à 0.5, arrondir à l'unité supérieure
  if (distance % 1 >= 0.5) {
    return Math.ceil(distance);
  }

  return roundedDistance;
};
console.log(latUti, lonUti, lat1, lat2, lat2, lon1, lon2, lon3);

let distance1 = roundDistance(haversine(latUti, lonUti, lat1, lon1));
let distance2 = roundDistance(haversine(latUti, lonUti, lat2, lon2));
let distance3 = roundDistance(haversine(latUti, lonUti, lat3, lon3));
</script>

<style>
body {
  margin: 0;
}
</style>
