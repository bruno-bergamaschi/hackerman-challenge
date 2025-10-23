<template>
  <Card>
    <h1 class="people-data-content__title">
      Informações sobre <span>{{ peopleData.name }}</span>
    </h1>

    <div class="people-data-content">
      <div class="people-data-content__section">
        <Section
          v-for="section in sections"
          :key="section.label"
          :title="section.label"
          :entity="section.value"
          :property="section.property"
        />
      </div>
    </div>

    <Button text="Pesquisar Novamente" @click="handleResetSearch" />
  </Card>
</template>

<script setup lang="ts">
import type { ISwapiPerson } from "~/stores/swapiApi/people";
import Card from "~/components/ui/card/index.vue";
import Button from "~/components/ui/button/index.vue";
import Section from "./section/index.vue";

const { peopleData } = defineProps<{
  peopleData: ISwapiPerson;
}>();

const emit = defineEmits<{
  (e: "search:reset"): void;
}>();

function handleResetSearch() {
  emit("search:reset");
}

const sections = computed(() => {
  return [
    { label: "Filmes", value: peopleData.films, property: "title" },
    { label: "Naves", value: peopleData.starships, property: "name" },
    { label: "Veículos", value: peopleData.vehicles, property: "name" },
    { label: "Espécie", value: peopleData.species, property: "name" },
    {
      label: "Planeta",
      value: peopleData.homeworld ? [peopleData.homeworld] : [],
      property: "name",
    },
  ];
});
</script>

<style scoped lang="scss" src="./style.scss" />
