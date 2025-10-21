const _getStorage = (type: "local" | "session" = "local") => {
  if (import.meta.client) {
    return type === "local" ? window.localStorage : window.sessionStorage;
  }
  return null;
};

export const useClientStorage = (
  storageType: "local" | "session" = "local"
) => {
  const storage = _getStorage(storageType);

  return {
    getItem: (key: string) => {
      if (!storage) return null;
      return storage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      if (!storage) return;
      storage.setItem(key, value);
    },
    removeItem: (key: string) => {
      if (!storage) return;
      storage.removeItem(key);
    },
  };
};
