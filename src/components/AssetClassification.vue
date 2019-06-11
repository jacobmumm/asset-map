<template>
  <b-container class="asset-classification">
    <div class="jumbotron">
      <h1>Asset Classification</h1>
      <hr>
      <p><strong>TYPES</strong> are the most basic classifications.</p>
      <p><strong>CATEGORIES</strong> are thematic classifications which may be nested into hierarchies.</p>
    </div>
    <b-row class="mb-4">
      <b-col>
        <h3>Asset Types:</h3>

        <b-list-group>
          <b-list-item class="d-flex align-items-center px-3 py-2" v-for="type in sortedTypes" :key="type.id">
            <b-col cols="10">
              <a v-if="!type.active">{{ type.title }}</a>
              <b-form-input v-if="type.active" v-model="type.title"></b-form-input>
            </b-col>
            <b-col cols="2" class="d-flex justify-content-end">
              <b-button v-if="!type.active" variant="light" @click="editType(type)" :disabled="editing_type" size="sm"><fa-icon icon="edit"/></b-button>
              <b-button v-if="!type.active" variant="light" @click="deleteType(type)" :disabled="editing_type" size="sm"><fa-icon icon="trash"/></b-button>
              <b-button v-if="type.active" variant="primary" @click="updateType(type)" size="sm"><fa-icon icon="check"/></b-button>
            </b-col>
          </b-list-item>
          <b-list-item v-if="!editing_type" class="d-flex align-items-center px-3 py-2">
            <b-col cols="9">
              <b-form-input v-model="newTypeName" placeholder="Add a type" class="mb-1"></b-form-input>
            </b-col>
            <b-col class="d-flex justify-content-end" cols="3">
              <b-button variant="light" 
                        class="ml-1"
                        size="sm" 
                        @click="saveType">
                        <fa-icon icon="plus"/>
              </b-button>
            </b-col>
          </b-list-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3>Asset Categories:</h3>

        <b-list-group>
          <b-list-item class="d-flex align-items-center px-3 py-2" v-for="category in sortedCategories" :key="category.id">
            <b-col cols="10">
              <a v-if="!category.active">{{ category.title }}</a>
              <b-form-input v-if="category.active" v-model="category.title"></b-form-input>
            </b-col>
            <b-col cols="2" class="d-flex justify-content-end">
              <b-button v-if="!category.active" variant="light" @click="editCategory(category)" :disabled="editing_type" size="sm"><fa-icon icon="edit"/></b-button>
              <b-button v-if="!category.active" variant="light" @click="deleteCategory(category)" :disabled="editing_type" size="sm"><fa-icon icon="trash"/></b-button>
              <b-button v-if="category.active" variant="primary" @click="updateCategory(category)" size="sm"><fa-icon icon="check"/></b-button>
            </b-col>
          </b-list-item>
          <b-list-item v-if="!editing_category" class="d-flex align-items-center px-3 py-2">
            <b-col cols="9">
              <b-form-input v-model="newCategoryName" placeholder="Add a category" class="mb-1"></b-form-input>
            </b-col>
            <b-col class="d-flex justify-content-end" cols="3">
              <b-button variant="light" 
                        class="ml-1"
                        size="sm" 
                        @click="saveCategory">
                        <fa-icon icon="plus"/>
              </b-button>
            </b-col>
          </b-list-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>

export default {
  name: 'asset-classification',
  data: function() {
    return {
      newTypeName: "",
      types: [],
      newCategoryName: "",
      categories: []
    };
  },
  computed: {
    sortedTypes: function() {
      return this.types.sort( (a, b) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        return 0;
      });
    },
    sortedCategories: function() {
      return this.categories.sort( (a, b) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        return 0;
      });
    }
  },
  mounted() {
    let self = this;
    fetch("/api/asset-types").then( res => res.json() )
      .then( types => {
        self.types = types;
      })
    fetch("/api/asset-categories").then( res => res.json() )
      .then( categories => {
        self.categories = categories;
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
