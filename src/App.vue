<template>
  <div id="app">
    <EagleAssetBrowser />
  </div>
</template>

<script>
import EagleAssetBrowser from './components/EagleAssetBrowser.vue'

export default {
  name: 'App',
  components: {
    EagleAssetBrowser
  }
}
</script>

<style>
#app {
  height: 100vh;
  margin: 0;
  padding: 10px;
}
</style>
