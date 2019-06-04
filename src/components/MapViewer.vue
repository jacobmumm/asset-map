<template>
  <div class="map-viewer">
    <b-row>
      <b-col>
        <div class='px-4'>

          <GmapMap
           :options="{
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              disableDefaultUi: false
            }"
            :center="location"
            :zoom="zoom"
            style="width: 100%; height: 500px"
            @click="mapClick"
          >
            <gmap-polygon v-for="(w,ix) in watersheds" :key="ix" :paths="[w.points]" :options="{ fillColor: w.fillColor }" />

            <gmap-polygon v-if="polygon" :paths="[polygon]" :options="{ fillColor }" :editable="true" @paths_changed="updateEdited($event)"/>

            <GmapMarker
              v-if="place"
              :position="place.geometry.location"
              :clickable="false"
              :draggable="false"
              @click="center=m.position"
            />

            <!-- <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            /> -->
          </GmapMap>
        </div>
      </b-col>
      <b-col class="mr-3">
        <h3>Watersheds:</h3>
        <table class='table'>
          <tbody>
            <tr v-for="(ws,ix) in watersheds" :key="ix">
              <td :style="'background-color: ' + ws.fillColor">{{ ws.name }}</td>
              <td><b-button variant="danger" @click="watersheds.splice(ix,1)"><fa-icon icon="trash"/></b-button></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <b-form-input v-model="watershed_name" placeholder="Add a watershed" />
              </td>
              <td>
                <verte v-if="watershed_name" v-model="fillColor" picker="square" model="rgb"></verte>
              </td>
              <td width="25%">
                <div v-if="creating_watershed">
                  <b-button class="" variant="outline-info" @click="cancelWatershed">Cancel</b-button>
                  <b-button v-if="polygon" class="mx-2" variant="info" :disabled="!polygon" @click="saveWatershed">Save</b-button>
                </div>
                <div v-if="!creating_watershed && watershed_name" >
                  <b-button :variant="watershed_name ? 'info' : null" :disabled="!watershed_name" @click="creating_watershed = true; polygon = null">Create</b-button>
                </div>

              </td>
            </tr>
            <tr v-if="creating_watershed">
              <td colspan=3>
                  <p v-if="!polygon">Click on the map to start drawing boundaries</p>
                  <p v-else>Drag the points around to define the watershed</p>
              </td>
            </tr>
          </tfoot>
        </table>

        <div v-if="watersheds.length > 0">
          <h3>Locate Asset:</h3>
          <gmap-autocomplete
            class="form-control"
            placeholder="What's the address?"
            :value="address"
            @place_changed="setPlace" 
          />
          <div class='text-center pt-3' v-if="locating">
            <fa-icon icon='spinner' size='3x' spin />
          </div>
          <div v-if="located">
            Your watershed is: {{ locatedWatershed ? locatedWatershed.name : 'Unknown' }} 
          </div>

          <!-- add marker at address -->
          <!-- XXX TODO 'looks like thats located in the X watershed' -->
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>

let defaultFillColor = '#CCCCCC';

export default {
  name: 'map',
  props: ['mapId'],
  mounted () {
    this.loadWatersheds();
  },
  data: function() {
    return {
      location: {lat: 35.5951, lng: -82.5515},
      zoom: 9,
      markers: [],
      watersheds: [],
      watershed_name: '',
      creating_watershed: false,
      polygon: null,
      fillColor: defaultFillColor,
      address: '',
      place: null,
      locating: false,
      located: false,
      locatedWatershed: null,
      mapId: null
    }
  },
  computed: {
    watershedPaths: function() {
      return this.watersheds.map(function(w) { return w.points })
    }
  },
  watch: {
    mapId: function() {
       this.loadWatersheds();
    }
  },
  methods: {
    loadWatersheds: function() {
      let self = this;
      if (!this.mapId) { this.cancelWatershed(); return; }
      fetch("/api/maps/" + this.mapId + "/watersheds").then(function(res) { return res.json(); })
        .then(function(watersheds) {
        self.watersheds = watersheds.map(function(w) {
          var points = w.bounds.split(":").map(function(b) {
              var coord = b.split(",");
              return {
                lat: parseFloat(coord[0]),
                lng: parseFloat(coord[1])
              };
          });
          return {
            name: w.title,
            fillColor: w.color,
            points: points
          };
        });
      });
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
      
      fetch("/api/maps/" + this.mapId + "/watersheds", {
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
      });
      
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
