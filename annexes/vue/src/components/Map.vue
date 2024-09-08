<template>
    <div class="map" ref="mapElement"></div>
</template>
<script setup>
import { ref, onMounted } from "vue";

import "leaflet/dist/leaflet.css";

import * as L from "leaflet";

const props = defineProps({
    center: Array,
    popup: String,
});
const initialMap = ref();
const mapElement = ref();

onMounted(() => {
    initialMap.value = L.map(mapElement.value).setView(props.center, 16);
    L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: `&copy; OpenStreetMap contributors`,
    }).addTo(initialMap.value);
    L.marker(props.center).bindPopup(props.popup).addTo(initialMap.value);
});
</script>
<style scoped>
.map {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
}
</style>
