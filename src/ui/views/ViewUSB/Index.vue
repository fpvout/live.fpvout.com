<template>
  <div>
    <md-dialog :md-active.sync="showHelp">
      <md-dialog-title>Help</md-dialog-title>
      <div class="md-dialog-content">
        <ol>
          <li>If you're using Windows, make sure you have the <a href="https://zadig.akeo.ie/">Zadig drivers</a> installed</li>
          <li>Connect your goggles to your computer</li>
          <li>Click "Connect to goggles"</li>
          <li>Wait for goggles to Connect</li>
          <li>Power up your drone</li>
        </ol>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showHelp = false">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <div class="flex justify-between">
      <p>{{ pairedGoggles.length }} Goggles connected</p>
      <div class="flex align-center">
        <div v-if="!compatibleBrowser">Your browser is not compatible, please use Google Chrome.</div>
        <md-button @click="requestConnection" class="md-raised md-accent" :disabled="!compatibleBrowser">Connect To Goggles</md-button>
        <md-button @click="showHelp = true" class="md-icon-button"><icon icon="help"></icon></md-button>
      </div>
    </div>
    <goggles v-for="(device, index) in pairedGoggles" :key="index" :device="device" />
  </div>
</template>

<script>
import GogglesDevice, {VID, PID} from '~/Goggles';
import Goggles from './Goggle.vue';

export default {
  components: {Goggles},
  data() {
    return {
      pairedGoggles: [],
      showHelp: false,
    }
  },
  computed: {
    compatibleBrowser() {
      return navigator.userAgent.indexOf('Chrome') !== -1;
    },
  },
  methods: {
    async connectToGoggles(device) {
      const newGoggles = new GogglesDevice(device);
      await newGoggles.connect();
      await newGoggles.requestVideo();
      this.pairedGoggles.push(newGoggles);
    },
    requestConnection() {
      navigator.usb.requestDevice({filters: [{vendorId: VID, productId: PID}]}).then((device) => {
        this.connectToGoggles(device);
      })
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .align-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
</style>
