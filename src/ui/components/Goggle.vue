<template>
  <div>
    <p><strong>Device Serial Number:</strong> {{ device.serialNumber }}</p>
    <video ref="player" controls autoplay :class="{hidden: !isPlaying}" :id="playerId"></video>
    <button @click="stopVideo">Stop</button>
  </div>
</template>

<script>
import JMuxer from 'jmuxer';

export default {
  props: ['device'],
  data() {
    return {
      jmuxer: null,
      isPlaying: false,
    }
  },
  computed: {
    playerId() {
      return `player-${this.device.serialNumber}`;
    },
  },
  methods: {
    stopVideo() {
      this.device.stopPolling();
    },
    startVideo() {
      this.device.startPolling();
    }
  },
  mounted() {
    this.jmuxer = new JMuxer({
      node: this.playerId,
      debug: true,
      mode: 'video',
      fps: 60,
    });

    this.device.onData = (data) => {
      if (data.buffer.byteLength === 0) {
        return;
      }

      this.jmuxer.feed({
        video: new Uint8Array(data.buffer),
      });

      this.isPlaying = true;
    };

    this.device.startPolling();
  },
  watch: {
    isPlaying() {
      if (this.$refs.player.paused) {
        this.$refs.player.play();
      }
    }
  }
}
</script>

<style scoped>
  .hidden {
    display: none;
  }
</style>
