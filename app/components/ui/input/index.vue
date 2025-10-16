<template>
  <div class="column">
    <input
      v-model="inputValue"
      v-on="$attrs"
      :class="{
        input: true,
        'input--success': isValidValue,
        'input--error': errorMessage,
      }"
      :placeholder="placeholder"
    />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

interface Props {
  placeholder?: string;
  isValidValue?: boolean;
  errorMessage?: string;
}

const { isValidValue = false } = defineProps<Props>();

const inputValue = defineModel<string>({ required: true });

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped lang="scss" src="./style.scss" />
