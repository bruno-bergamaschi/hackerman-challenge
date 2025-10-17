export const useUserEmailStore = defineStore("userEmail", () => {
  const emailCookie = useCookie("user_email_test");

  const getEmail = computed(() => emailCookie.value);

  function setEmail(value: string) {
    emailCookie.value = value;
  }

  return { getEmail, setEmail };
});
