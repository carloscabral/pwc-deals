import Home from './components/Home.vue';
import Deals from './components/Deals.vue'
import Users from './components/Users.vue'
import Dashboard from './components/Dashboard.vue'
import Countries from './components/Countries.vue'
import States from './components/States.vue'
import Cities from './components/Cities.vue'
import SIC from './components/SIC.vue'
import Approvements from './components/Approvements.vue'


export const routes = [
    { path: '/', component: Home, children: [
        { path: '', component: Dashboard },    
        { path: '/usuarios', component: Users },
        { path: '/transacoes', component: Deals },
        { path: '/paises', component: Countries },
        { path: '/estados', component: States },
        { path: '/cidades', component: Cities },
        { path: '/SIC', component: SIC },
        { path: '/aprovacoes', component: Approvements },
    ]}
]