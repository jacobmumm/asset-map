import Vue from 'vue'
import Router from 'vue-router'
import Maps from './components/Maps.vue'
import AssetClassification from './components/AssetClassification.vue'
import Home from './views/Home.vue'
import Assets from './components/Assets.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/maps',
      name: 'maps',
      component: Maps
    },
    {
      path: '/asset-classification',
      name: 'asset-classification',
      component: AssetClassification
    },
    {
      path: '/assets',
      name: 'asset-map',
      component: Assets
    },
    {
      path: '/contribute',
      name: 'contribute',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      name: '404',
      component: Home
    }
  ]
})
