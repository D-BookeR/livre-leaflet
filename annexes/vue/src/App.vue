<script setup>
import Map from "./components/Map.vue";
</script>

<template>
    <Map :center="[48.9068, 2.2464]" popup="Hello World" />
    <Map :center="[48.91, 2.25]" popup="Hello World"></Map>
</template>
