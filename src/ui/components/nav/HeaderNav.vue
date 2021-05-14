<template>
  <div class="header">
    <h3 class="md-title">DigiView - Web</h3>
    <div class="icons">
      <a href="https://github.com/fpvout/fpv-browser" class="me-2">
        <icon icon="github"></icon>
        <md-tooltip md-direction="bottom">View the code on Github</md-tooltip>
      </a>
      <a href="https://discord.gg/69wm92Wr" class="me-2">
        <icon icon="discord"></icon>
        <md-tooltip md-direction="bottom">Join our discord</md-tooltip>
      </a>
      <span>
        <icon icon="googlePlay"></icon>
        <md-tooltip md-direction="bottom">Android app coming soon!</md-tooltip>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .icons a {
    display: inline-block
  }
  .icons, .icons a {
    color: #fff!important;
  }
  .header {
    display: flex;
    width: 100%;

    .md-title {
      flex: 1;
      font-family: 'Gidole';
      text-transform: uppercase;
    }
  }

</style>