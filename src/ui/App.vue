<template>
  <md-app id="app">
    <md-app-toolbar>
      <header-nav />
    </md-app-toolbar>
    <md-app-content>
      <router-view />
      <footer id="footer">DigiView Web - <router-link to="/about">About</router-link></footer>
    </md-app-content>
  </md-app>
</template>

<script>
import HeaderNav from '~/ui/components/nav/HeaderNav.vue';

export default {
  components: {HeaderNav},
}
</script>

<style lang="scss">
  @import '~/ui/styles/main.scss';

  #app, body {
    min-height: 100%;
  }
  body {
    height: 100%;
  }
  .md-app-toolbar {
    background: rgb(71,118,230);
    background: linear-gradient(45deg, rgba(71,118,230,1) 0%, rgba(142,84,233,1) 100%);
  }
  .md-app-toolbar .md-title {
    color: white!important;
  }
  #footer {
    position: absolute;
    text-align: center;
    bottom: 1em;
    left: 0;
    right: 0;
  }
</style>
