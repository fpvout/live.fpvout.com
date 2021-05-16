<template>
  <div>
    <md-switch v-model="userEnabledWebCodecs">Enable WebCodecs <small>(experimental)</small></md-switch>
    <component :is="webCodecsEnabled ? 'web-codec' : 'jmuxer'" :device="device" />
  </div>
</template>

<script>
import Jmuxer from './Jmuxer.vue';
import WebCodec from './WebCodec.vue';

export default {
  props: ['device'],
  data() {
    return {
      userEnabledWebCodecs: true,
    }
  },
  components: {Jmuxer, WebCodec},
  computed: {
    webCodecsEnabled() {
      return this.isWebCodecAvailable && this.userEnabledWebCodecs;
    },
    isWebCodecAvailable() {
      return 'VideoEncoder' in window;
    }
  }
}
</script>