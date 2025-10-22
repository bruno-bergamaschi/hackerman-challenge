<template>
  <div :class="{ tag: true, 'tag--empty': !text }">
    {{ text ?? "N/A" }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string | null;
}>();
</script>

<style scoped lang="scss" src="./style.scss" />
