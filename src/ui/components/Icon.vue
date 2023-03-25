<template>
  <span :style="`font-size:${size}px;width:${size}px;height:${size}px`">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      :class="[fullIconName, 'fill-current']"
      :width="size"
      :height="size"
      :style="`font-size:${size}px;width:${size}px;height:${size}px`"
    >
      <path :d="path" />
    </svg>
  </span>
</template>

<script>
// import * as MDI from '@mdi/js';
import {mdiDiscord, mdiGooglePlay, mdiGithub, mdiHelpCircleOutline } from '@mdi/js';
const MDI = {mdiDiscord, mdiGooglePlay, mdiGithub, mdiHelpCircleOutline }

export default {
  props: {
    icon: {
      required: true,
      type: String,
    },
    size: {
      type: Number,
      default: 24,
    },
  },
  computed: {
    showUnkownIcon() {
      return MDI[this.fullIconName] === undefined;
    },
    fullIconName() {
      return `mdi${this.icon.slice(0, 1).toUpperCase()}${this.icon.slice(1)}`;
    },
    path() {
      if (this.showUnkownIcon) {
        return MDI.mdiHelpCircleOutline;
      }
      return MDI[this.fullIconName];
    },
  },
};
</script>

<style scoped>
.fill-current {
  fill: currentColor;
}
</style>