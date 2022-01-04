<template>
  <div>
    <video ref="player" controls autoplay :class="{hidden: !isPlaying}" :id="playerId"></video>
    <div v-if="!isPlaying">
      <p class="text-center md-title">Waiting to recieve video...</p>
    </div>
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

  beforeDestroy() {
    this.stopVideo();
  },

  mounted() {
    this.jmuxer = new JMuxer({
      node: this.playerId,
      debug: false,
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

    this.startVideo();
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
  .text-center {
    text-align: center;
  }
</style>
