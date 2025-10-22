<template>
  <div class="search-content">
    <Transition>
      <Loading v-if="isLoading" class="position-absolute" />

      <Card
        v-else-if="!isLoading && !peopleData"
        class="position-absolute"
        subtitle="Agora, digite seu personagem favorito de Star Wars"
      >
        <div class="search-content__input">
          <Input
            v-model="inputValue"
            :error-message="errorMessage"
            :is-valid-value="isValidInputValue"
          />
        </div>

        <Button text="Próximo" @click="fetchPeopleData" />
      </Card>

      <PeopleData
        v-else-if="!isLoading && peopleData"
        class="position-absolute"
        :peopleData="peopleData"
        @search:reset="resetSearch"
      />
    </Transition>
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

watch(inputValue, () => {
  if (hasFetchError.value) {
    hasFetchError.value = false;
  }
});

const isValidInputValue = computed(() => {
  return !hasFetchError.value && inputValue.value.trim().length > 0;
});

async function fetchPeopleData() {
  isLoading.value = true;
  hasFetchError.value = false;

  try {
    if (!isValidInputValue.value) {
      hasFetchError.value = true;
      return;
    }

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
