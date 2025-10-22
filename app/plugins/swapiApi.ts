export default defineNuxtPlugin(() => {
  const {
    public: { swapiApiUrl },
  } = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: swapiApiUrl,
  });

  return {
    provide: {
      swapiApi: api,
    },
  };
});
