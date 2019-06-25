<template>
  <b-container class="asset-form">
    <div class="jumbotron">
      <h1>Create Assets &amp; Relationships</h1>
    </div>
    <b-row>
      <b-col>
        <h2>Record as part of Interview Process (optional)</h2>
        <b-row class="mb-4">
          <b-col cols="6">
            <h4>Interviewer:</h4>
            <b-form-input v-model="interviewerName" placeholder="Interviewer Name" class="mb-1"></b-form-input>
          </b-col>
          <b-col cols="6">
            <h4>Interviewee:</h4>
            <b-form-input v-model="intervieweeName" placeholder="Interviewee Name" class="mb-1"></b-form-input>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Assets" active><Assets /></b-tab>
          <b-tab title="Relationships"><AssetRelationships /></b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>
<script>
import Assets from './Assets.vue';
import AssetRelationships from './AssetRelationships.vue';

export default {
  name: 'asset-form',
  components: {
    Assets,
    AssetRelationships
  },
  data: function() {
    return {
      types: [],
      relationships: [],
      assets: []
    };
  },
  computed: {
  },
  mounted() {
    let self = this;
    fetch("/api/assets").then( res => res.json() )
      .then( assets => {
        self.assets = assets;
      })
    fetch("/api/asset-types").then( res => res.json() )
      .then( types => {
        self.types = types;
      })
    /*fetch("/api/asset-relationship-types").then( res => res.json() )
      .then( relationships => {
        self.relationships = relationships;
      })*/
  },
  methods: {
    /** ASSET CRUD METHODS **
    deleteType: function(type) {
      let self = this;
      self.$bvModal.msgBoxConfirm("Are you sure you want to delete this asset type?")
        .then( confirm => {
          if (confirm) {
            fetch("/api/asset-types/" + type.id, {
              method: "DELETE"
            }).then( () => {
              self.types = self.types.filter( t => t.id !== type.id );
            })
          }
        })
    },
    editType: function(type) {
      this.clearActiveTypes();
      type.active = true;
      this.editing_type = true;
    },
    updateType: function(type) {
      let self = this;
      let updatedProps = {
        title: type.title,
      };
      fetch("/api/asset-types/" + type.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProps)
      }).then( res => {
        //assert(res.status === 204);
        type.active = false;
        self.editing_type = false;
        self.$forceUpdate();
      });
    },
    saveType: function() {
      let self = this;
      fetch("/api/asset-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.newTypeName
        })
      }).then( res => res.json() )
	      .then((type) => {
          self.types.push(type);
          self.newTypeName = "";
        });
    },*/
  }
}
</script>
