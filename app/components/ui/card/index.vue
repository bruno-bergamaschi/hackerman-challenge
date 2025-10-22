<template>
  <div
    class="card"
    :style="{
      width: `${width}px`,
      height: height ? `${height}px` : 'auto',
    }"
  >
    <h1 v-if="title" :class="{
      card__title: true,
      'card__title--with-subtitle': subtitle,
      'card__title--colon': colon,
    }"> {{ title }}</h1>
    
    <p v-if="subtitle" class="card__subtitle"> {{ subtitle }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface CardProps {
  title?: string;
  subtitle?: string;
  colon?: boolean;
  width?: string | number;
  height?: string | number;
}

const { width = 410, colon = false } = defineProps<CardProps>();
</script>

<style scoped lang="scss" src="./style.scss" />
