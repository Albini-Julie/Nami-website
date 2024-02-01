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
const deg2rad = (deg) => deg * (Math.PI / 180);

// Fonction pour calculer la distance haversine entre deux points
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance en kilomètres

  return distance;
};

// Conversion des coordonnées en float
const latUti = parseFloat(props.latitudeUti);
const lonUti = parseFloat(props.longitudeUti);
const lat1 = parseFloat(latitude1.value);
const lon1 = parseFloat(longitude1.value);
const lat2 = parseFloat(latitude2.value);
const lon2 = parseFloat(longitude2.value);
const lat3 = parseFloat(latitude3.value);
const lon3 = parseFloat(longitude3.value);

// Arrondir à l'unité supérieure si chiffre après la virgule >= 0.5 et arrondir à l'unité inférieure si chiffre après la virgule < à 0.5
const roundDistance = (distance) => {
  const roundedDistance = Math.floor(distance); // Arrondir à l'unité inférieure par défaut

  // Si la partie décimale est égale ou supérieure à 0.5, arrondir à l'unité supérieure
  if (distance % 1 >= 0.5) {
    return Math.ceil(distance);
  }

  return roundedDistance;
};

const distance1 = roundDistance(haversine(latUti, lonUti, lat1, lon1));
const distance2 = roundDistance(haversine(latUti, lonUti, lat2, lon2));
const distance3 = roundDistance(haversine(latUti, lonUti, lat3, lon3));
</script>

<style>
body {
  margin: 0;
}
</style>
