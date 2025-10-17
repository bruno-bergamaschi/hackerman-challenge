<template>
  <ClientOnly>
    <div class="content">
      <div class="content__logo" />

      <Card>
        <h1 class="content__title">Olá!</h1>
        <p class="content__subtitle">
          Para começar seu teste, digite um e-mail:
        </p>

        <Input
          v-model="email"
          placeholder="exemplo@email.com"
          :is-valid-value="useValidateEmail(email)"
        />

        <Button
          text="Próximo"
          :is-disabled="!useValidateEmail(email)"
          @click="navigateToSearchPage"
        />
      </Card>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserEmailStore } from "~/stores/userEmail";
import { useValidateEmail } from "~/composables/useValidateEmail";

import Card from "~/components/ui/card/index.vue";
import Input from "~/components/ui/input/index.vue";
import Button from "~/components/ui/button/index.vue";

const { setEmail } = useUserEmailStore();

const email = ref("");

function navigateToSearchPage() {
  setEmail(email.value);
  navigateTo("/search");
}
</script>

<style scoped lang="scss" src="./style.scss" />
