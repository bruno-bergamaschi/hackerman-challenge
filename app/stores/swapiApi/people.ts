import type { ISwapiApi } from "~~/types/nuxt";

interface IPeople {
  name: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  homeworld: string;
}

interface IFilms {
  title: string;
}

interface ISpecies {
  name: string;
}

interface IStarships {
  name: string;
}

interface IVehicles {
  name: string;
}

interface IHomeworld {
  name: string;
}

interface ISwapiApiPeopleResponse {
  count: number;
  results: IPeople[];
}

export type ISwapiPerson = Pick<IPeople, "name"> & {
  films: IFilms[];
  species: ISpecies[];
  starships: IStarships[];
  vehicles: IVehicles[];
  homeworld: IHomeworld | null;
};

interface ISwapiApiPeopleStoreResponse {
  count: number;
  people: ISwapiPerson | null;
}

const storageKey = `SWAPI_API_PEOPLE`;

function _replaceUrl(value: string[], swapiApi: string) {
  return value ? value?.map((url) => url.replace(swapiApi, "")) : [];
}

function _createPromiseRequest<T>(
  urlList: string[],
  swapiApi: ISwapiApi,
  swapiApiUrl: string = ""
) {
  const replacedUrls = _replaceUrl(urlList, swapiApiUrl);
  return Promise.all(replacedUrls.map((url) => swapiApi<T>(url)));
}

export const useSwapiApiPeopleStore = defineStore("swapiApiPeople", () => {
  const { $swapiApi } = useNuxtApp();

  const {
    public: { swapiApiUrl },
  } = useRuntimeConfig();

  const { getItem, setItem, removeItem } = useClientStorage("local");

  function getSwapiPeopleDataCache(): ISwapiApiPeopleStoreResponse {
    const data = getItem(storageKey);
    return data
      ? (JSON.parse(data) as ISwapiApiPeopleStoreResponse)
      : { count: 0, people: null };
  }

  async function fetchSwapiPeopleData({
    search = null,
    useStorageData = false,
  }: {
    search?: string | null;
    useStorageData?: boolean;
  } = {}): Promise<ISwapiApiPeopleStoreResponse> {
    try {
      if (useStorageData) {
        const storageData = getSwapiPeopleDataCache();

        return storageData || { count: 0, people: null };
      }

      const { count, results } = await $swapiApi<ISwapiApiPeopleResponse>(
        "/people",
        {
          params: {
            search,
          },
        }
      );

      if (count === 0) {
        return { count, people: null };
      }

      const [people] = results;

      const [films, starships, species, vehicles, homeworlds] =
        await Promise.all([
          _createPromiseRequest<IFilms>(people?.films!, $swapiApi, swapiApiUrl),
          _createPromiseRequest<IStarships>(
            people?.starships!,
            $swapiApi,
            swapiApiUrl
          ),
          _createPromiseRequest<ISpecies>(
            people?.species!,
            $swapiApi,
            swapiApiUrl
          ),
          _createPromiseRequest<IVehicles>(
            people?.vehicles!,
            $swapiApi,
            swapiApiUrl
          ),
          _createPromiseRequest<IHomeworld>(
            people?.homeworld ? ([people?.homeworld] as string[]) : [],
            $swapiApi,
            swapiApiUrl
          ),
        ]);

      const [homeworld] = homeworlds;
      const dataToStore = {
        count,
        people: {
          ...people!,
          films,
          starships,
          species,
          vehicles,
          homeworld: homeworld!,
        },
      };

      if (import.meta.client) {
        setItem(storageKey, JSON.stringify(dataToStore));
      }

      return dataToStore;
    } catch (err) {
      throw err;
    }
  }

  function removeSwapiPeopleDataCache() {
    removeItem(storageKey);
  }

  return {
    fetchSwapiPeopleData,
    removeSwapiPeopleDataCache,
    getSwapiPeopleDataCache,
  };
});
