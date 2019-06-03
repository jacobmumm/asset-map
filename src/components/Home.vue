<template>
  <div class="home">
    <b-row>
      <b-col>
        <div class='px-4'>
          <select class="form-control" v-model="selectedMapId" v-on:change="handleChange">
            <option>Select a map</option>
            <option v-for="map in maps" :key="map.id" :value="map.id">
              {{map.title}}
            </option>
          </select>
        </div>
      </b-col>
      <b-col class="ml-2">
        <input id="newMapTitle" :value="newMapTitle" />
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="selectedMapId">
      <map :id="selectedMapId"></map>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Map from '@/components/Map.vue'

let defaultFillColor = '#CCCCCC';

export default {
  name: 'home',
  components: {
    Map
  },
  mounted () {
    let self = this;
    fetch("/api/maps").then(function(res) { return res.json(); })
      .then(function(maps) {
        self.maps = maps;
  /*      if (maps.length) {
          self.selectedMapId = maps[0].id;
        }*/
      });
  },
  data: function() {
    return {
      selectedMapId: null,
      maps: []
    }
  },
  computed: {
    selectedMap: function(vm) {
      if (!(vm.selectedMapId && vm.maps)) {
        return [];
      }
      return vm.maps.find(function(map) {
        return vm.selectedMapId === map.id;
      });
    }
  },
  watch: {
  },
  methods: {
    handleChange: function(event) {
      console.log(this.selectedMapId, this.selectedMap, this.maps, this.maps[this.selectedMapId]);
    },
    mapClick: function(event) {
      if (this.creating_watershed && !this.polygon) {
        
        let center = { lat: event.latLng.lat(), lng: event.latLng.lng() } // Center
        console.log('CLICK MAP=', center)

        let size = 0.1

        this.polygon = [ 
          { lat: center.lat + size, lng: center.lng + size },
          { lat: center.lat + size, lng: center.lng - size },
          { lat: center.lat - size, lng: center.lng - size },
          { lat: center.lat - size, lng: center.lng + size },
        ]
        console.log(this.polygon)
      }
    },
    saveWatershed: function() {
      var self = this;
      var newWatershed = {
        name: this.watershed_name,
        points: this.polygon,
        fillColor: this.fillColor
      };
      
      var first = true;
      var bounds = this.polygon.reduce(function(str, coord) {
        if (first) {
          first = false;
        } else {
          str += ":";
        }
        str += coord.lat + "," + coord.lng;
        return str;
      }, "");
      
      fetch("/api/watersheds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newWatershed.name,
          bounds: bounds,
          color: newWatershed.fillColor
        })
      }).then(function(res) { return res.json(); })
	.then(function(ws) {
        if (ws.id) {
          newWatershed.id = ws.id;
          self.watersheds.push(newWatershed);
        }
        console.log(this.watersheds)
      });
      /*this.watersheds.push({
        name: this.watershed_name,
        points: this.polygon,
        fillColor: this.fillColor
      })
      console.log(this.watersheds)
      
      let parsed = JSON.stringify(this.watersheds);
      localStorage.setItem('watersheds', parsed);
      */
      this.cancelWatershed()
    },
    cancelWatershed: function() {
      this.polygon = null; 
      this.creating_watershed = false; 
      this.watershed_name = ''
      this.fillColor = defaultFillColor
    },
    updateEdited(mvcArray) {
      console.log('MVC=', mvcArray)
      let paths = [];
      for (let i=0; i<mvcArray.getLength(); i++) {
        let path = [];
        for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({lat: point.lat(), lng: point.lng()});
        }
        paths.push(path);
      }
      console.log('paths=', paths[0])
      this.polygon = paths[0]
    },
    setPlace(place) {
      if (!place) return

      console.log(place)

      this.locateWatershed(place)

      // this.latLng = {
      //   lat: place.geometry.location.lat(),
      //   lng: place.geometry.location.lng(),
      // };
    },
    locateWatershed (place) {
      this.place = place

      this.address = place.formatted_address

      let lat = this.place.geometry.location.lat()
      let lng = this.place.geometry.location.lng()
      let latLng = new google.maps.LatLng(lat, lng)
      console.log("LL=", latLng)

      this.located = false
      this.locating = true

      this.locatedWatershed = null

      let this1 = this

      this.watersheds.forEach(function(w) {
        let wPolygon = new google.maps.Polygon({
          paths: w.points // Need to call map?
        });

        console.log('CHECKING', wPolygon)
        if(google.maps.geometry.poly.containsLocation(latLng, wPolygon)) {
          this1.locatedWatershed = w
        }
      })

      this.locating = false
      this.located = true
    }
  }
}
</script>
