<template>
  <button
    :class="['button', variantClass]"
    v-bind="$attrs"
    :aria-label="text"
    type="button"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { useButton } from "./script";

interface ButtonProps {
  text: string;
  variant?: "default";
}

const { variant = "default" } = defineProps<ButtonProps>();

const { variantClass } = useButton({ variant });
</script>

<style scoped lang="scss" src="./style.scss" />
