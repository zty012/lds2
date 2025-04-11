import { load, Store } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";

export function useStore<T>(key: string, defaultValue: T) {
  const [store, setStore] = useState<Store | null>(null);
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    // setTimeout(() => {
    load("data.json")
      .then((st) => {
        console.log("loaded store", st, st.get(key));
        setStore(st);
        st.onChange((k, v) => {
          console.log("store changed", k, v);
          if (k === key) setValue(v as T);
        });
        return st.get<T>(key);
      })
      .then((v) => setValue(typeof v === "undefined" ? defaultValue : v));
    // }, 1000);
  }, []);

  const set = (value: T) => {
    console.log("set", key, value);
    store?.set(key, value);
    setValue(value);
  };

  return [value, set] as const;
}
