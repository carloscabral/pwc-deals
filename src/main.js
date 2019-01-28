import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

import { routes } from './routes';

Vue.use(VueMaterial)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  //mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }    
  }  
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
