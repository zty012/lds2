import { load, Store } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";

export function useStore<T>(key: string, defaultValue: T) {
  const [store, setStore] = useState<Store | null>(null);
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    load("data.json")
      .then((st) => {
        setStore(st);
        return st.get<T>(key);
      })
      .then((v) => setValue(typeof v === "undefined" ? defaultValue : v));
  }, []);

  const set = (value: T) => {
    store?.set(key, value);
    setValue(value);
  };

  return [value, set] as const;
}
