<template>
  <div class="section-content">
    <h2 class="section-content__title">{{ title }}</h2>

    <div class="section-content__tags">
      <Tag
        v-if="entity.length"
        v-for="(value, index) in entity"
        :key="index"
        :text="value[property] || null"
      />
      <Tag v-else :text="null" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tag from "~/components/ui/tag/index.vue";

const { entity } = defineProps<{
  title: string;
  entity: Record<string, any>[];
  property: string;
}>();
</script>

<style scoped lang="scss" src="./style.scss" />
