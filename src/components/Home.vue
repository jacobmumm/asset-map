<template>
  <div class="home">
    <map-picker v-model="selectedMapId"></map-picker>
    <map-viewer v-bind:mapId="selectedMapId"></map-viewer>
  </div>
</template>
<script>
import MapPicker from './MapPicker.vue';
import MapViewer from './MapViewer.vue';

export default {
  name: 'home',
  components: {
    mapPicker: MapPicker,
    mapViewer: MapViewer
  },
  data: function() {
    return {
      selectedMapId: null,
    };
  },
}
</script>
