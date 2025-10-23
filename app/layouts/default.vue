<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100dvh;
  background: url("~/assets/img/StarWarsBackground.png") repeat center/contain;
}
</style>
