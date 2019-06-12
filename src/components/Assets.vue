<template>
  <div class="asset-viewer">
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
            <GmapMarker
              :key="index"
              v-for="(a, index) in assetsWithPositions"
              :icon="a.icon"
              :position="a.position"
              :clickable="false"
              :draggable="a.active"
              @dragend="updateEditedActive"
            />
            <GmapMarker
              :v-if="creating_asset && newAsset.position"
              icon="/img/markers/green-marker.png"
              :position="newAsset.position"
              :clickable="false"
              :draggable="true"
              @dragend="updateEdited"
            />
          </GmapMap>
        </div>
      </b-col>

      <b-col class="mr-3">

        <h3>Assets:</h3>

        <b-list-group>
          <b-list-item class="asset-list-item d-flex align-items-center px-3 py-2 rounded mb-1" v-for="asset in assets" :key="asset.id">
            <b-col cols="10">
              <a v-if="!asset.active">{{ asset.title }}</a>
              <b-form-input v-if="asset.active" v-model="asset.title"></b-form-input>
            </b-col>
            <b-col cols="2" class="d-flex justify-content-end">
              <b-button v-if="!asset.active" variant="light" @click="editAsset(asset)" :disabled="editing_asset || creating_asset" size="sm"><fa-icon icon="edit"/></b-button>
              <b-button v-if="!asset.active" variant="light" @click="deleteAsset(asset)" :disabled="editing_asset || creating_asset" size="sm"><fa-icon icon="trash"/></b-button>
              <b-button v-if="asset.active" variant="primary" @click="updateAsset(asset)" size="sm"><fa-icon icon="check"/></b-button>
            </b-col>
          </b-list-item>
          <b-list-item class="asset-list-item px-3 py-2 mb-1" key="new">
            <b-form v-if="!editing_asset">
              <b-row class="align-items-center">
                <b-col cols="3">
                  <b-form-select v-model="newAsset.asset_type_id">
                    <option v-for="type in assetTypes" :key="type.id" :value="type.id">
                      {{type.title}}
                    </option>
                  </b-form-select>
                </b-col>
                <b-col cols="6">
                  <b-form-input v-model="newAsset.title" placeholder="New asset name" class="mb-1"></b-form-input>
                </b-col>
                <b-col class="d-flex justify-content-end" cols="3">
                  <b-button v-if="creating_asset" 
                            class="ml-1"
                            size="sm"
                            variant="light" 
                            @click="cancelAsset"><fa-icon icon="times"/>
                  </b-button>
                  <b-button v-if="creating_asset && newAsset.position" 
                            class="ml-1" 
                            size="sm"
                            variant="primary" 
                            @click="saveAsset"><fa-icon icon="check"/>
                  </b-button>
                  <b-button v-if="!creating_asset && newAsset.title" 
                            variant="light" 
                            class="ml-1"
                            size="sm" 
                            :disabled="!newAsset.title" 
                            @click="creating_asset = true">
                            <fa-icon icon="plus"/>
                  </b-button>
                </b-col>
              </b-row>
              <b-row v-if="creating_asset">
                <b-col>
                  <p v-if="!newAsset.position">Click on the map to place your asset.</p>
                  <p v-else>Drag the point around to the correct asset position.</p>
                </b-col>
              </b-row>
            </b-form>
          </b-list-item>
        </b-list-group>

      </b-col>
    </b-row>

  </div>
</template>
<style>
  .asset-list-item {
    background: #f8f8f8;
  }
</style>
<script>
import {loaded} from 'vue2-google-maps';

export default {
  name: 'map',
  props: ['mapId'],
  mounted () {
    this.loadAssets();
    this.loadAssetTypes();
  },
  data: function() {
    return {
      baseMarkerIcon: {
          path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor: "#FF0000",
          fillOpacity: 1,
          strokeColor: '',
          strokeWeight: 0
      },
      iconSize: { width: 20, height: 32 },
      location: {lat: 35.5951, lng: -82.5515},
      zoom: 9,
      markers: [],
      assets: [],
      creating_asset: false,
      newAsset: {},
      address: '',
      place: null,
      locating: false,
      located: false,
      locatedAsset: null,
      assetTypes: []
    }
  },
  computed: {
    assetsWithPositions: function() {
      let aas = (this.assets || []).filter( a => !!a.position );
      console.log('computed', aas);
      return aas;
    }
  },
  watch: {
    /*mapId: function() {
       this.loadAssets();
    }*/
  },
  methods: {
    getIcon: function(typeId) {
      let iconPath = null;
      switch (typeId) {
        case 1: {
          iconPath = '/img/types/user-solid.svg';
          break;
        }
        case 2: {
          iconPath = '/img/types/map-marked-solid.svg';
          break;
        }
        case 3: {
          iconPath = '/img/types/gem-solid.svg';
          break;
        }
        case 4: {
          iconPath = '/img/types/building-solid.svg';
          break;
        }
        case 5: {
          iconPath = '/img/types/users-solid.svg';
          break;
        }
        case 11: {
          iconPath = '/img/types/balance-scale-solid.svg';
          break;
        }
        case 12: {
          iconPath = '/img/types/creative-commons-nc-brands.svg';
          break;
        }
      }
      if (iconPath) {
        return {
          url: iconPath,
          size: {width: 20, height: 20, f: 'px', b: 'px'},
          scaledSize: {width: 16, height: 16, f: 'px', b: 'px'}
        };
      }
      return null;
    },
    loadAssets: function() {
      let self = this;
      Promise.all([loaded, fetch("/api/assets")]).then( x => x[1].json() )
        .then( assets => {
          self.assets = assets.map( asset => {
            asset.position = JSON.parse(asset.position);
            asset.icon = self.getIcon(asset.asset_type_id);
            asset.iconPath = asset.icon.url;
            asset.shape = {
              coords: [1, 1, 1, 20, 18, 20, 18, 1],
              type: 'poly'
            };
            return asset;
          });
        });
    },
    loadAssetTypes: function() {
      let self = this;
      fetch("/api/asset-types").then( res => res.json() )
        .then( types => {
          self.assetTypes = types;
          self.newAsset = this.generateEmptyAsset();
      });
    },
    mapClick: function(event) {
      if (this.creating_asset && !this.newAsset.position) {        
        this.newAsset.position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      }
    },
    generateEmptyAsset: function() {
      return {
        title: "",
        asset_type_id: this.assetTypes && this.assetTypes.length ? this.assetTypes[0].id : 1,
        position: null
      }
    },
    clearActive: function() {
      this.assets = this.assets.map( asset => {
        asset.active = false;
        return asset;
      });
    },
    deleteAsset: function(asset) {
      let self = this;
      self.$bvModal.msgBoxConfirm("Are you sure you want to delete this asset?")
        .then( confirm => {
          if (confirm) {
            fetch("/api/assets/" + asset.id, {
              method: "DELETE"
            }).then( () => {
              self.assets = self.assets.filter( a => a.id !== asset.id );
            })
          }
        })
    },
    editAsset: function(asset) {
      this.clearActive();
      asset.active = true;
      this.editing_asset = true;
    },
    updateAsset: function(asset) {
      let self = this;
      fetch("/api/assets/" + asset.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: asset.title,
          asset_type_id: asset.asset_type_id,
          position: JSON.stringify(asset.position)
        })
      }).then( res => {
        //assert(res.status === 204);
        asset.active = false;
        self.editing_asset = false;
        self.$forceUpdate();
      });
    },
    saveAsset: function() {
      let self = this;

      let asset = {
        title: this.newAsset.title,
        asset_type_id: this.newAsset.asset_type_id,
        position: JSON.stringify(this.newAsset.position)
      };
     
      fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asset)
      }).then( res => res.json() )
	      .then((asset) => {
          self.assets.push(Object.assign({}, asset, {
            position: self.newAsset.position
          }));
          self.cancelAsset();
        });
    },
    cancelAsset: function(asset) {
      this.newAsset = this.generateEmptyAsset();
      this.creating_asset = false; 
    },
    updateEdited(event) {
      this.newAsset.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    },
    updateEditedActive(event) {
      let activeAsset = this.assets.filter( a => a.active )[0];
      activeAsset.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    },
    setPlace(place) {
      if (!place) return

      this.locateAsset(place)

      // this.latLng = {
      //   lat: place.geometry.location.lat(),
      //   lng: place.geometry.location.lng(),
      // };
    },
    locateAsset (place) {
      this.place = place

      this.address = place.formatted_address

      let lat = this.place.geometry.location.lat()
      let lng = this.place.geometry.location.lng()
      let latLng = new google.maps.LatLng(lat, lng)

      this.located = false
      this.locating = true

      this.locatedAsset = null

      let this1 = this

      this.assets.forEach( w => {
        let wPolygon = new google.maps.Polygon({
          paths: w.polygon // Need to call map?
        });

        if(google.maps.geometry.poly.containsLocation(latLng, wPolygon)) {
          this1.locatedAsset = w
        }
      })

      this.locating = false
      this.located = true
    }
  }
}
</script>
