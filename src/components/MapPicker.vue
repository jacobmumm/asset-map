<template>
  <div class="map-picker">
    <b-row>
      <b-col>
        <div class='px-4'>
          <b-form-group label="Current Map">
            <b-form-select v-model="value">
              <option v-for="map in maps" :key="map.id" :value="map.id">
                {{map.title}}
              </option>
            </b-form-select>
          </b-form-group>
        </div>
      </b-col>
      <b-col class="ml-2">
        <b-form-group label="New Map">
          <b-form inline>
            <b-form-input id="newMapTitle" v-model="newMapTitle" placeholder="Create a map" />
            <b-button class="ml-1" v-on:click="createMap()">Add Map</b-button>
          </b-form>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="value">
      <b-col>
        <watershed-map v-bind:id="value"></watershed-map>
      </b-col>
    </b-row>
  </div>
</template>
<style>
  fieldset { text-align: left; }
</style>
<script>

let defaultFillColor = '#CCCCCC';

export default {
  name: 'map-picker',
  mounted () {
    let self = this;
    fetch("/api/maps").then(function(res) { return res.json(); })
      .then(function(maps) {
        self.maps = maps;
        if (maps.length) {
          self.value = maps[0].id;
        }
      });
  },
  props: {
    value: {
      type: Number
    }
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    }
  },
  data: function() {
    return {
      newMapTitle: "",
      maps: []
    };
  },
  computed: {
    selectedMap: function(vm) {
      if (!(vm.value && vm.maps)) {
        return [];
      }
      return vm.maps.find(function(map) {
        return vm.value === map.id;
      });
    }
  },
  methods: {
    createMap: function() {
      var self = this;
      var map = {
        title: this.newMapTitle,
      };
      fetch("/api/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(map)
      }).then( res => res.json() )
      .then(function(m) {
        self.maps.push(m);
        self.value = m.id;
        self.newMapTitle = "";
      });
    } 
  }
}
</script>
