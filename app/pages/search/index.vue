<template>
  <div class="search-content">
    <Card v-if="!isLoading && !peopleData">
      <h1 class="search-content__title">
        Agora, digite seu personagem favorito de Star Wars
      </h1>

      <div class="search-content__input">
        <Input v-model="inputValue" :error-message="errorMessage" />
      </div>

      <Button text="Próximo" @click="fetchPeopleData" />
    </Card>

    <Loading v-if="isLoading" />

    <PeopleData
      v-if="!isLoading && peopleData"
      :peopleData="peopleData"
      @search:reset="resetSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ISwapiPerson } from "~/stores/swapiApi/people";
import { useSwapiApiPeopleStore } from "~/stores/swapiApi/people";

import Card from "~/components/ui/card/index.vue";
import Input from "~/components/ui/input/index.vue";
import Button from "~/components/ui/button/index.vue";
import Loading from "~/components/ui/loading/index.vue";
import PeopleData from "~/components/peopleData/index.vue";

const {
  fetchSwapiPeopleData,
  getSwapiPeopleDataCache,
  removeSwapiPeopleDataCache,
} = useSwapiApiPeopleStore();

definePageMeta({
  middleware: "validate-email",
});

const inputValue = ref("");
const isLoading = ref(true);
const hasFetchError = ref(false);
const peopleData = ref<ISwapiPerson | null>(null);

const errorMessage = computed(() => {
  return hasFetchError.value ? "Personagem inválido" : null;
});

onNuxtReady(() => {
  const { people } = getSwapiPeopleDataCache();

  if (people) {
    peopleData.value = people;
  }

  isLoading.value = false;
});

async function fetchPeopleData() {
  isLoading.value = true;
  hasFetchError.value = false;

  try {
    const { count, people } = await fetchSwapiPeopleData({
      search: inputValue.value,
      useStorageData: false,
    });

    if (count === 0) {
      hasFetchError.value = true;
      peopleData.value = null;
      return;
    }

    peopleData.value = people;
  } finally {
    isLoading.value = false;
  }
}

function resetSearch() {
  peopleData.value = null;
  removeSwapiPeopleDataCache();
  inputValue.value = "";
}
</script>

<style scoped lang="scss" src="./style.scss" />
