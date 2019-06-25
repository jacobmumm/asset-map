<template>
  <div id="app">

    <div id="nav" class="mb-2">
      <b-navbar toggleable="lg" type="primary" variant="light">

        <b-navbar-brand to="/">WNC Mutual Aid</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        
        <b-collapse id="nav-collapse" is-nav>
          
          <b-navbar-nav>
            <b-nav-item to="/maps">Watershed Maps</b-nav-item>
            <b-nav-item to="/asset-classification">Asset Classification</b-nav-item>
            <b-nav-item to="/assets">Asset Map</b-nav-item>
            <b-nav-item to="/asset-form">Asset Form</b-nav-item>
          </b-navbar-nav>
        
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/contribute" disabled>Contribute</b-nav-item>
          </b-navbar-nav>
        
        </b-collapse>
      
      </b-navbar>
    </div>

    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
