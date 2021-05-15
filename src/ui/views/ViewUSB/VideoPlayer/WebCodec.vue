<template>
  <div>
    <canvas ref="player" style="width:50%;border: 1px solid #bababa" width="720" height="576"></canvas>
  </div>
</template>

<script>

function dec2hex(array) {
  return array.map((val) => val.toString(16).padStart(2, '0')).join(' ').toUpperCase()
}

const MICROSECONDS_PER_FRAME = 16700;

export default {
  props: ['device'],
  data() {
    return {
      isPlaying: false,
    }
  },
  computed: {  },
  methods: {
    stopVideo() {
      this.device.stopPolling();
    },
    startVideo() {
      this.device.startPolling();
    }
  },
  mounted() {
    const canvasContext = this.$refs.player.getContext('2d');
    const handleFrame = (frame) => {
      canvasContext.drawImage(frame, 0, 0);
      frame.close();
    }

    const init = {
      output: handleFrame,
      error: (e) => {
        console.log(e);
        this.device.close();
      },
    };
    let decoder = new VideoDecoder(init);
    decoder.configure({ codec: 'avc1.64002A' });

    let currentTimestamp  = 0;
    this.device.onData = (data) => {
      if (data.buffer.byteLength === 0) {
        return;
      }
      
      const chunkData = new Uint8Array(data.buffer);
      let NALUnitsFound = 0;
      chunkData.forEach((val, index, self) => {
        if (self.length > index + 2 && self[index] === 0 && self[index + 1] === 0 && self[index + 2] === 0) {
          NALUnitsFound++;
        }
      });

      if (NALUnitsFound === 4 && currentTimestamp !== undefined && currentTimestamp !== 0) {
        return;
      }

      if (NALUnitsFound % 2 === 1) {
        console.log(`Uneven number of NAL units found: ${NALUnitsFound}`);
        return;
      }

      currentTimestamp += MICROSECONDS_PER_FRAME;
      const chunk = new EncodedVideoChunk({
        type: "delta",
        timestamp: currentTimestamp,
        data: chunkData,
      })
      decoder.decode(chunk);
    };

    this.device.startPolling();
  },
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
