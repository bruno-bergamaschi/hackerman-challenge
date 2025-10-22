import { useUserEmailStore } from "~/stores/userEmail";

export default defineNuxtRouteMiddleware(() => {
  const store = useUserEmailStore();

  const email = store.getEmail;

  if (!email) {
    return navigateTo("/");
  }
});
