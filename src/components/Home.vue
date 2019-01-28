<template>
  <div id="app">
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

  </div>
</template>

<script>

export default {
  name: 'app',
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    editProfile() {
      alert("Editar informações do usuário logado.")
    },
    logout() {
      alert("Sair do sistema.")
    }
  }
}
</script>

<style lang="scss">

</style>