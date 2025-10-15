<template>
  <button
    :class="['button', variantClass]"
    :disabled="isDisabled"
    v-on="$attrs"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useButton } from "./script";

interface ButtonProps {
  text: string;
  isDisabled?: boolean;
  variant?: "default";
}

const { variant = "default" } = defineProps<ButtonProps>();

const { variantClass } = useButton({ variant });
</script>

<style scoped lang="scss" src="./style.scss" />
