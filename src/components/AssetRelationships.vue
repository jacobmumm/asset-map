<template>
  <b-container fluid class="asset-relationships">
    <b-row class="mb-4">
      <b-col>
        <h3>Asset Relationships</h3>
        <b-row>
          <b-col cols="4">Asset A</b-col>
          <b-col cols="4">Is Related Because</b-col>
          <b-col cols="4">Asset B</b-col>
        </b-row>
        <b-row>
          <b-col cols="4"><vue-bootstrap-typeahead v-model="fromAsset" :data="assets" :serializer="a => a.title" minMatchingChars="0" maxMatches="10"></vue-bootstrap-typeahead></b-col>
          <b-col cols="4"><vue-bootstrap-typeahead v-model="relationshipType" :data="relationships" :serializer="r => r.title" minMatchingChars="0" maxMatches="10"></vue-bootstrap-typeahead></b-col>
          <b-col cols="4"><vue-bootstrap-typeahead v-model="toAsset" :data="assets" :serializer="a => a.title" minMatchingChars="0" maxMatches="10"></vue-bootstrap-typeahead></b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col class="d-flex justify-content-end">
            <b-button v-on:click="saveRelationship()" variant="primary">Save</b-button>
          </b-col>
        </b-row>
        <b-table striped hover :items="relationships" :fields="fields"></b-table>
      </b-col>
  </b-container>
</template>
<script>

export default {
  name: 'asset-classification',
  data: function() {
    return {
      interviewId: null,
      fromAsset: null,
      toAsset: null,
      relationship: null,
      assets: [],
      relationshipTypes: [],
      relationships: [],
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
    fetch("/api/assets-relationship-types").then( res => res.json() )
      .then( types => {
        self.relationshipTypes = types;
      })
    fetch("/api/interviews/" + self.interviewId + "/relationships").then( res => res.json() )
      .then( relationships => {
        self.relationships = relationships;
      })
  },
  methods: {
    /** ASSET TYPE CRUD METHODS **/
    clearActiveTypes: function() {
      this.types = this.types.map(function(t) {
        t.active = false;
        return t;
      });
    },
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
    },


    /** ASSET CATEGORY CRUD METHODS **/
    clearActiveCategories: function() {
      this.categories = this.categories.map(function(c) {
        c.active = false;
        return c;
      });
    },
    deleteCategory: function(category) {
      let self = this;
      self.$bvModal.msgBoxConfirm("Are you sure you want to delete this asset category?")
        .then( confirm => {
          if (confirm) {
            fetch("/api/asset-categories/" + category.id, {
              method: "DELETE"
            }).then( () => {
              self.categories = self.categories.filter( c => c.id !== category.id );
            })
          }
        })
    },
    editCategory: function(category) {
      this.clearActiveCategories();
      category.active = true;
      this.editing_category = true;
    },
    updateCategory: function(category) {
      let self = this;
      let updatedProps = {
        title: category.title,
      };
      fetch("/api/asset-categories/" + category.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProps)
      }).then( res => {
        //assert(res.status === 204);
        category.active = false;
        self.editing_category = false;
        self.$forceUpdate();
      });
    },
    saveCategory: function() {
      let self = this;
      fetch("/api/asset-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.newCategoryName
        })
      }).then( res => res.json() )
	      .then((category) => {
          self.categories.push(category);
          self.newCategoryName = "";
        });
    },
  }
}
</script>
