export {};

export type ISwapiApi = <T = any>(
  url: string,
  options?: Parameters<typeof $fetch<T>>[1]
) => Promise<T>;

declare module "#app" {
  interface NuxtApp {
    $swapiApi: ISwapiApi;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $swapiApi: NuxtApp["$swapiApi"];
  }
}
