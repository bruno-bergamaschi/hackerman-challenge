<template>
 <Search/>
</template>

<script setup lang="ts">
import Search from '~/components/pages/search/index.vue'

definePageMeta({
  middleware: "validate-email",
});
</script>