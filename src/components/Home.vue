<template>

  <v-app id="app">

    <!-- Main app toolbar -->
    <v-toolbar class="colored-shadow" color="primary" dark fixed app clipped-right>
      <div class="hidden-sm-and-down">
        <v-icon v-if="!drawer" @click.stop="drawer = !drawer">menu</v-icon>
        <v-icon v-if="drawer" @click.stop="drawer = !drawer">close</v-icon>
      </div>
      <v-toolbar-title>Base de transações</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat><v-icon class="hidden-sm-and-down" left dark>exit_to_app</v-icon>Sair</v-btn>
      </v-toolbar-items>      
        <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    
    <!-- Left drawer navigation -->
    <v-navigation-drawer class="hidden-sm-and-down" width="240" v-model="drawer" :mini-variant="mini" fixed app>
      
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
  
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img class="logo" src="../assets/images/pwc-logo.png" alt="PwC Logo">
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

          <v-list-tile
            v-for="(item, index) in menuMainTitles"
            :key="index"
            :to="item.path">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>              
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
      
          <div v-if="!mini">
            <v-list-group 
              v-for="item in menuGroupItems" 
              :key="item.title" 
              v-model="item.active" 
              :prepend-icon="item.action" 
              no-action>
              
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-for="(item, index) in menuGroupItems[0].subItems"
                :key="index"
                :to="item.path">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>

              </v-list-tile>            

            </v-list-group>
          </div>

        </v-list>

    </v-navigation-drawer>

    <!-- Right drawer navigation -->
    <v-navigation-drawer class="hidden-md-and-up" v-model="drawerRight" temporary right fixed clipped app>  

      <v-list class="pa-1">

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img class="logo" src="../assets/images/pwc-logo.png" alt="PwC Logo">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Renato Neves</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>

      <v-divider light></v-divider>

      <v-list dense>

        <v-list>

          <v-list-tile
            v-for="(item, index) in menuMainTitles"
            :key="index"
            :to="item.path">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>              
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
      
          <v-list-group
            v-for="item in menuGroupItems" 
            :key="item.title" 
            v-model="item.active" 
            :prepend-icon="item.action" 
            no-action>
            
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(item, index) in menuGroupItems[0].subItems"
              :key="index"
              :to="item.path">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>            

          </v-list-group>

        </v-list>

      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" temporary fixed></v-navigation-drawer>

    <!-- Main app content -->
    <v-content>
      <main>
        <v-container fluid fill-height>
          <v-layout row>
            <v-flex xs12>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </main>
    </v-content>

    <!-- Main app footer -->
    <footer class="text-center mb-3">
      <p>&copy; Copyright 2019</p>
      <p>Todos os direitos reservados. Desenvolvido por <a href="https://www.abacomm.com.br" target="_blank">Abacomm</a></p>
    </footer>

  </v-app>
 

</template>

<script>

export default {
  name: 'app',
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    mini: true,
    menuMainTitles: [
      { title: 'Dashboard', path: '/', icon: 'apps' },
      { title: 'Transações', path: '/transacoes', icon: 'attach_money' },
    ],
    menuGroupItems: [
        {
          action: 'settings',
          title: 'Configurações',
          active: true,
          subItems: [
            { title: 'Usuários', path: '/usuarios' },
            { title: 'Países', path: '/paises' },
            { title: 'Estados', path: '/estados' },
            { title: 'Cidades', path: '/cidades' },
            { title: 'SIC', path: '/sic' },                        
            { title: 'Aprovações', path: '/aprovacoes' }          
          ]
        }
      ] 
  }),
  methods: {
    editProfile() {
      alert("Editar informações do usuário logado.")
    },
    logout() {
      alert("Sair do sistema.")
    }    
  },
  watch: {

  },
  props: {
    source: String
  }
};
</script>

<style lang="scss">

</style>