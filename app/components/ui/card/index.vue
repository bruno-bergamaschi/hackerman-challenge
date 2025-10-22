<template>
  <div
    class="card"
    :style="{
      width: `${width}px`,
      height: height ? `${height}px` : 'auto',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface CardProps {
  width?: string | number;
  height?: string | number;
}

const { width = 410 } = defineProps<CardProps>();
</script>

<style scoped lang="scss" src="./style.scss" />
