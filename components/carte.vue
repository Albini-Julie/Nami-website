<template>
  <h1>{{ latitude1 }}</h1>
  <div style="height: 100vh; width: 100vw">
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

      <LMarker :lat-lng="[40.7128, -74.006]">
        <LTooltip :content="'New York, USA'"></LTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

defineProps({
  primaryColor: String,
  secondaryColor: String,
  primaryColorText: String,
  secondaryColorText: String,
  latitude1: String,
  latitude2: String,
  latitude3: String,
  longitude1: String,
  longitude2: String,
  longitude3: String,
  latitudeUti: String,
  longitudeUti: String,
  ville: String,
});

const zoom = ref(2);
</script>

<style>
body {
  margin: 0;
}
</style>
