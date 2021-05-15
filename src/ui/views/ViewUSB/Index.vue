<template>
  <div class="">

    <md-dialog :md-active.sync="showHelp">
      <md-dialog-title>Help</md-dialog-title>
      <div class="md-dialog-content">
        <ol>
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

    <div class="">
      <div class="flex justify-between">
        <p>{{ pairedGoggles.length }} Goggles connected</p>
        <div class="flex align-center">
          <md-button @click="requestConnection" class="md-raised md-accent">Connect To Goggles</md-button>
          <md-button @click="showHelp = true" class="md-icon-button"><icon icon="help"></icon></md-button>
        </div>
      </div>
      <goggles v-for="(device, index) in pairedGoggles" :key="index" :device="device" />
    </div>
  </div>
</template>

<script>
import GogglesDevice, {VID, PID} from '~/Goggles';
import Goggles from '~/ui/views/ViewUSB/VideoPlayer/Index.vue';

export default {
  components: {Goggles},
  data() {
    return {
      pairedGoggles: [],
      showHelp: false,
    }
  },
  created() {
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