<template>
  <!-- <div id="app">
    <div class="page-container">
      <md-app>
        <md-app-toolbar class="md-primary" md-elevation="0">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title" style="flex: 1">Base de Transações</span>
          <md-menu md-direction="bottom-start">
            <md-button md-menu-trigger><md-icon style="font-size: 16px !important; margin-bottom: 3px">person</md-icon>&nbsp;Carlos - <small style="color: rgba(255,255,255,.7)">admin</small></md-button>

            <md-menu-content>
              <md-menu-item @click="editProfile">Editar</md-menu-item>
              <md-menu-item @click="logout">Sair</md-menu-item>
            </md-menu-content>
          </md-menu>
                  
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Menu</span>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <md-list-item @click="$router.push('/')" activeClass="active" class="waves-effect waves-light btn-large">
              <md-icon>apps</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>

            <md-list-item @click="$router.push('/transacoes')" activeClass="active">
              <md-icon>attach_money</md-icon>
              <span class="md-list-item-text">Transações</span>
            </md-list-item>

            <md-list-item @click="$router.push('/usuarios')" activeClass="active">
              <md-icon>group</md-icon>
              <span class="md-list-item-text">Usuários</span>
            </md-list-item>

            <md-divider class="mt-3"></md-divider>

            <md-list-item @click="$router.push('/paises')" activeClass="active">
              <md-icon>flag</md-icon>
              <span class="md-list-item-text">Países</span>
            </md-list-item>

            <md-list-item @click="$router.push('/estados')" activeClass="active">
              <md-icon>person_pin</md-icon>
              <span class="md-list-item-text">Estados</span>
            </md-list-item>

            <md-list-item @click="$router.push('/cidades')" activeClass="active">
              <md-icon>map</md-icon>
              <span class="md-list-item-text">Cidades</span>
            </md-list-item>

            <md-list-item @click="$router.push('/sic')" activeClass="active">
              <md-icon>settings</md-icon>
              <span class="md-list-item-text">SIC</span>
            </md-list-item>
          
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <router-view></router-view>
        </md-app-content>

      </md-app>
      <footer class="text-center">
        <p>&copy; Copyright 2019</p>
        <p>Todos os direitos reservados. Desenvolvido por <a href="https://www.abacomm.com.br" target="_blank">Abacomm</a></p>
      </footer>
    </div>

  </div> -->
  <v-app id="app">

    <div class="show-mobile">
      <v-navigation-drawer v-model="drawerRight" absolute temporary right clipped app>
        <v-list dense>

          <v-list>

            <v-list-tile @click="$router.push('/')">
              <v-list-tile-action>
                <v-icon>apps</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="$router.push('/transacoes')">
              <v-list-tile-action>
                <v-icon>attach_money</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Transações</v-list-tile-title>
            </v-list-tile>                 
        
            <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToUser">
                <v-list-tile-content>
                  <v-list-tile-title>Usuários</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToCountries">
                <v-list-tile-content>
                  <v-list-tile-title>Países</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToStates">
                <v-list-tile-content>
                  <v-list-tile-title>Estados</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToCities">
                <v-list-tile-content>
                  <v-list-tile-title>Cidades</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToSIC">
                <v-list-tile-content>
                  <v-list-tile-title>SIC</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <!-- <v-list-tile @click="goToApprovals"> -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Aprovações</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>                                    

            </v-list-group>

          </v-list>

        </v-list>
      </v-navigation-drawer>
    </div>

    <v-toolbar color="orange darken-3" dark fixed app clipped-right>
      <div class="hidden-desktop">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </div>
      <v-toolbar-title>Base de transações</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>Carlos</v-btn>
      </v-toolbar-items>      
      <div class="show-mobile">
        <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
      </div>
    </v-toolbar>

    <div class="hidden-desktop">
      <v-navigation-drawer width="240" v-model="drawer" :mini-variant="mini" fixed app>
        
          <v-list class="pa-1">
            <v-list-tile v-if="mini" @click.stop="mini = !mini">
              <v-list-tile-action>
                <v-icon>chevron_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>
    
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>
    
              <v-list-tile-content>
                <v-list-tile-title>Renato Neves</v-list-tile-title>
              </v-list-tile-content>
    
              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          <v-divider light></v-divider>

          <v-list dense>

            <v-list-tile @click="$router.push('/')">
              <v-list-tile-action>
                <v-icon>apps</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="$router.push('/transacoes')">
              <v-list-tile-action>
                <v-icon>attach_money</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Transações</v-list-tile-title>
            </v-list-tile>                 
        
            <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToUser">
                <v-list-tile-content>
                  <v-list-tile-title>Usuários</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToCountries">
                <v-list-tile-content>
                  <v-list-tile-title>Países</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToStates">
                <v-list-tile-content>
                  <v-list-tile-title>Estados</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToCities">
                <v-list-tile-content>
                  <v-list-tile-title>Cidades</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="goToSIC">
                <v-list-tile-content>
                  <v-list-tile-title>SIC</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <!-- <v-list-tile @click="goToApprovals"> -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Aprovações</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>                                    

            </v-list-group>

          </v-list>        
      </v-navigation-drawer>
    </div>

    <v-navigation-drawer v-model="left" temporary fixed></v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height>
        <v-layout row>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- <v-navigation-drawer
      v-model="right"
      right
      temporary
      fixed
    ></v-navigation-drawer> -->

    <v-footer color="#EF6C00" class="white--text" app>
    <!-- <v-footer color="#fff" app> -->
      <span>&copy; Copyright 2019 &#8901; Todos os direitos reservados.</span>
      <v-spacer></v-spacer>
      <small class="abacomm-link">Desenvolvido pela <a href="https://www.abacomm.com.br" target="_blank">Abacomm</a></small>
    </v-footer>
  </v-app>

</template>

<script>
// export default {
//   name: 'app',
//   data: () => ({
//     menuVisible: false
//   }),
//   methods: {
//     toggleMenu () {
//       this.menuVisible = !this.menuVisible
//     },
//     editProfile() {
//       alert("Editar informações do usuário logado.")
//     },
//     logout() {
//       alert("Sair do sistema.")
//     }
//   }
// }

export default {
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    mini: true,
    items: [
        {
          action: 'settings',
          title: 'Configurações',
          active: true,
          items: [
            { title: 'Usuários', goToPath: 'goToUser' },
            { title: 'Países', goToPath: 'goToDeals' },
            { title: 'Estados', goToPath: 'goToStates' },
            { title: 'Cidades', goToPath: 'goToCities' },
            { title: 'SIC', goToPath: 'goToSIC' },                        
            { title: 'Aprovações', goToPath: 'goToApprovals' }          
          ]
        }
      ] 
  }),
  methods: {
    goToUser() { this.$router.push('/usuarios') },
    goToCountries() { this.$router.push('/paises') },
    goToStates() { this.$router.push('/estados') },
    goToCities() { this.$router.push('/cidades') },
    goToSIC() { this.$router.push('/sic') },
    goToApprovals() { this.$router.push('/aprovacoes') }
  },
  watch: {

  },
  props: {
    source: String
  }
};
</script>

<style lang="scss">

@media only screen and (min-width: 600px) {
  .show-mobile {
    display: none;
  }
}  

@media only screen and (max-width: 600px) {
  .hidden-desktop {
    display: none;
  }
}

.abacomm-link {
  text-transform: uppercase;
  // font-weight: bold;
  font-size: .7rem;
  letter-spacing: 1px;

  a {
    color: inherit;
  }
}

</style>