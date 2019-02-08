import Vue from 'vue'
import App from './App.vue'
import { routes } from './routes';

import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/es5/util/colors'

Vue.use(VueRouter)

Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.darken3,
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5    
  }
})

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
