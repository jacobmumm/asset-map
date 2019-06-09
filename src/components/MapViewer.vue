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
            <gmap-polygon v-for="(w,ix) in watersheds" :key="ix" :paths="[w.polygon]" :editable="w.active" :options="{ fillColor: w.color }" @paths_changed="updateEdited($event, w)"/>

            <gmap-polygon v-if="newWatershed.polygon" :paths="[newWatershed.polygon]" :options="{ fillColor: newWatershed.color }" :editable="true" @paths_changed="updateEdited($event, newWatershed)"/>

            <GmapMarker
              v-if="place"
              :position="place.geometry.location"
              :clickable="false"
              :draggable="false"
              @click="center=m.position"
            />

            <!--<GmapMarker
              :key="index"
              v-for="(a, index) in assets"
              :position="a.position"
              :clickable="true"
              :draggable="false"
              @click="center=m.position"
            /> -->
          </GmapMap>
        </div>
      </b-col>

      <b-col class="mr-3">

        <h3>Watersheds:</h3>

        <b-list-group>
          <b-list-item class="watershed-list-item d-flex align-items-center px-3 py-2 rounded mb-1" v-for="ws in watersheds" :key="ws.id" :style="'border-left: 4px solid ' + ws.color">
            <b-col cols="10">
              <a v-if="!ws.active">{{ ws.title }}</a>
              <b-form-input v-if="ws.active" v-model="ws.title"></b-form-input>
            </b-col>
            <b-col cols="2" class="d-flex">
              <b-button v-if="!ws.active" variant="info" @click="editWatershed(ws)" :disabled="editing_watershed || creating_watershed" size="sm"><fa-icon icon="edit"/></b-button>
              <b-button v-if="!ws.active" variant="danger" @click="watersheds.splice(ix,1)" :disabled="editing_watershed || creating_watershed" size="sm" class="ml-1"><fa-icon icon="trash"/></b-button>
              <b-button v-if="ws.active" variant="primary" @click="updateWatershed(ws)" size="sm" class="ml-1"><fa-icon icon="check"/></b-button>
            </b-col>
          </b-list-item>
          <b-list-item class="watershed-list-item px-3 py-2 mb-1" key="new">
            <b-form v-if="!editing_watershed">
              <b-row class="align-items-center">
                <b-col cols="9">
                  <b-form-input v-model="newWatershed.title" placeholder="Add a watershed" class="mb-1"></b-form-input>
                </b-col>
                <b-col class="d-flex justify-content-end" cols="3">
                  <verte class="mr-2" v-if="newWatershed.title" v-model="newWatershed.color" picker="square" model="rgb"></verte>
                  <b-button v-if="creating_watershed" 
                            class="ml-1"
                            variant="outline-info" 
                            @click="cancelWatershed"><fa-icon icon="times"/>
                  </b-button>
                  <b-button v-if="creating_watershed && newWatershed.polygon" 
                            class="ml-1" 
                            variant="primary" 
                            @click="saveWatershed"><fa-icon icon="check"/>
                  </b-button>
                  <b-button v-if="!creating_watershed && newWatershed.title" 
                            variant="info" 
                            class="ml-1"
                            size="sm" 
                            :disabled="!newWatershed.title" 
                            @click="newWatershed.active = true; creating_watershed = true; newWatershed.polygon = null">
                            <fa-icon icon="plus"/>
                  </b-button>
                </b-col>
              </b-row>
              <b-row v-if="creating_watershed">
                <b-col>
                  <p v-if="!polygon">Click on the map to start drawing boundaries</p>
                  <p v-else>Drag the points around to define the watershed</p>
                </b-col>
              </b-row>
            </b-form>
          </b-list-item>
        </b-list-group>

        

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
            Your watershed is: {{ locatedWatershed ? locatedWatershed.title : 'Unknown' }} 
          </div>

          <!-- add marker at address -->
          <!-- XXX TODO 'looks like thats located in the X watershed' -->
        </div>
      </b-col>
    </b-row>

  </div>
</template>
<style>
  .watershed-list-item {
    background: #f8f8f8;
  }
</style>
<script>
export default {
  name: 'map',
  props: ['mapId'],
  mounted () {
    this.newWatershed = this.generateEmptyWatershed();
    this.loadWatersheds();
  },
  data: function() {
    return {
      location: {lat: 35.5951, lng: -82.5515},
      zoom: 9,
      markers: [],
      watersheds: [],
      creating_watershed: false,
      newWatershed: {},
      address: '',
      place: null,
      locating: false,
      located: false,
      locatedWatershed: null
    }
  },
  computed: {
    watershedPaths: function() {
      return this.watersheds.map(function(w) { return w.polygon; })
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
          w.polygon = self.boundsToPolygon(w.bounds);
          return w;
        });
      });
    },
    mapClick: function(event) {
      if (this.creating_watershed && !this.newWatershed.polygon) {
        
        let center = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        let size = 0.1

        this.newWatershed.polygon = [ 
          { lat: center.lat + size, lng: center.lng + size },
          { lat: center.lat + size, lng: center.lng - size },
          { lat: center.lat - size, lng: center.lng - size },
          { lat: center.lat - size, lng: center.lng + size },
        ]
      }
    },
    boundsToPolygon: function(bounds) {
      return bounds.split(":").map(function(b) {
        var coord = b.split(",");
        return {
          lat: parseFloat(coord[0]),
          lng: parseFloat(coord[1])
        };
      });
    },
    polygonToBounds: function(polygon) {
      let first = true;
      return polygon.reduce(function(str, coord) {
        if (first) {
          first = false;
        } else {
          str += ":";
        }
        str += coord.lat + "," + coord.lng;
        return str;
      }, "");
    },
    generateEmptyWatershed: function() {
      return {
        title: "",
        color: "#CCC",
        polygon: null,
        bounds: ""
      }
    },
    clearActive: function() {
      this.watersheds = this.watersheds.map(function(w) {
        w.active = false;
        return w;
      });
    },
    editWatershed: function(ws) {
      this.clearActive();
      ws.active = true;
      this.editing_watershed = true;
    },
    updateWatershed: function(ws) {
      let self = this;
      let watershed = {
        title: ws.title,
        color: ws.color,
        bounds: this.polygonToBounds(ws.polygon)
      };
      console.log("PATCHING", JSON.stringify(watershed));
      fetch("/api/watersheds/" + ws.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watershed)
      }).then(function(res) {
        //assert(res.status === 204);
        if (ws.active) { console.log("resetting for real"); }
        ws.active = false;
        self.editing_watershed = false;
        self.$forceUpdate();
      });
    },
    saveWatershed: function() {
      var self = this;
      var watershed = {
        title: this.newWatershed.title,
        color: this.newWatershed.color
      };

      watershed.bounds = this.polygonToBounds(this.newWatershed.polygon);
      
      fetch("/api/maps/" + this.mapId + "/watersheds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watershed)
      }).then(function(res) { return res.json(); })
	    .then(function(ws) {
        self.watersheds.push(Object.assign({}, ws, {
          polygon: self.newWatershed.polygon
        }));
        self.cancelWatershed();
      });
    },
    cancelWatershed: function(watershed) {
      this.newWatershed = this.generateEmptyWatershed();
      this.creating_watershed = false; 
    },
    updateEdited(mvcArray, watershed) {
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
      watershed.polygon = paths[0]
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
          paths: w.polygon // Need to call map?
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
