<template>
  <div class="content">
    <div class="content__logo" />

    <Card title="Olá!" subtitle="Para começar seu teste, digite um e-mail">
      <div class="content__input">
        <Input
          v-model="email"
          placeholder="exemplo@email.com"
          :is-valid-value="useValidateEmail(email)"
        />
      </div>

      <Button
        text="Próximo"
        :disabled="!useValidateEmail(email)"
        @click="navigateToSearchPage"
      />
    </Card>
  </div>
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
