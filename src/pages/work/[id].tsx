import { useMemo } from "react";
import { cn } from "../../cn";
import students from "../../data/students.json";
import { useParams } from "../../router";
import { Work } from "../../types";
import { useStore } from "../store";

export default function WorkPage() {
  const { id } = useParams("/work/:id");
  const [storeData, setStoreData] = useStore<Work[]>("works", []);
  const data = useMemo(() => {
    console.log(storeData);
    return storeData.find((value) => value.id === id)?.data || [];
  }, [id, storeData]);
  const setData = (value: boolean[]) => {
    setStoreData(
      storeData.map((item) =>
        item.id === id ? { ...item, data: value } : item,
      ),
    );
  };

  return (
    <div className="flex h-full flex-1 items-center justify-center rounded-md bg-slate-900 p-2">
      <div className="grid grid-cols-6 gap-4">
        {data.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600 transition duration-500",
                {
                  "bg-green-600": value,
                },
              )}
              onClick={() =>
                setData([
                  ...data.slice(0, index),
                  !data[index],
                  ...data.slice(index + 1),
                ])
              }
            >
              {index + 1}
            </div>
            <span>{students[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
