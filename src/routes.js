import Home from './components/Home.vue';
import Deals from './components/Deals.vue'
import Users from './components/Users.vue'
import NewDeal from './components/NewDeal.vue'
import NewUser from './components/NewUser.vue'
import NewCountry from './components/NewCountry.vue'
import NewCity from './components/NewCity.vue'
import Dashboard from './components/Dashboard.vue'
import Countries from './components/Countries.vue'
import States from './components/States.vue'
import Cities from './components/Cities.vue'
import SIC from './components/SIC.vue'


export const routes = [
    { path: '/', component: Home, children: [
        { path: '', component: Dashboard },    
        { path: '/usuarios', component: Users },
        { path: '/transacoes', component: Deals },
        { path: '/transacoes/novo', component: NewDeal },
        { path: '/usuarios/novo', component: NewUser },
        { path: '/paises/novo', component: NewCountry },
        { path: '/cidades/novo', component: NewCity },
        { path: '/paises', component: Countries },
        { path: '/estados', component: States },
        { path: '/cidades', component: Cities },
        { path: '/SIC', component: SIC },
    ]}
]