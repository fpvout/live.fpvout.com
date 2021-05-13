<template>
  <div id="app">
    <goggles v-for="(device, index) in pairedGoggles" :key="index" :device="device" />
    <p>{{ pairedGoggles.length }} Goggles connected</p>
    <button @click="requestConnection">Connect To Goggles</button>
  </div>
</template>

<script>
import GogglesDevice, {VID, PID} from '~/Goggles';
import Goggles from '~/ui/components/Goggle.vue';

export default {
  components: {Goggles},
  data() {
    return {
      pairedGoggles: [],
      autoConnect: true,
    }
  },
  created() {
    navigator.usb.getDevices().then((devices) => {
      devices.forEach((device) => {
        this.connectToGoggles(device)
      });
    });
    navigator.usb.onconnect = (e) => {
      if (this.autoConnect && e.device.vendorId === VID && e.device.productId === PID) {
        this.connectToGoggles(e.device);
      }
    }
  },
  methods: {
    async connectToGoggles(device) {
      console.log(`Connecting to goggles`);
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