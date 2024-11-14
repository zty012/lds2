import { defaultWindowIcon, getVersion } from "@tauri-apps/api/app";
import { Menu, PredefinedMenuItem } from "@tauri-apps/api/menu";
import { TrayIcon } from "@tauri-apps/api/tray";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Delete, Pencil, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { cn } from "../cn";
import Loading from "../components/Loading";
import { useParams } from "../router";
import { Work } from "../types";
import { useStore } from "./store";

export default function Layout() {
  const [works, setWorks] = useStore<Work[]>("works", []);
  const [loaded, setLoaded] = useState(false);
  const tray = useRef<TrayIcon | null>(null);
  const { id } = useParams("/work/:id");
  const navigate = useNavigate();

  useEffect(() => {
    // 创建托盘图标
    (async () => {
      tray.current = await TrayIcon.new({
        icon: (await defaultWindowIcon())!,
        title: "lds的精神制裁",
        tooltip: "lds的精神制裁",
        menu: await Menu.new({
          items: [
            {
              id: "version",
              text: `Version ${await getVersion()}`,
              enabled: false,
            },
            {
              id: "author",
              text: "By ZTY",
              enabled: false,
            },
            await PredefinedMenuItem.new({
              item: "Separator",
            }),
            {
              id: "open",
              text: "打开",
              action: () => {
                getCurrentWindow().show();
              },
            },
            {
              id: "quit",
              text: "退出",
              action: () => {
                tray.current?.close();
                tray.current = null;
                getCurrentWindow().close();
              },
            },
          ],
        }),
      });
    })();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => {
      tray.current?.close();
      tray.current = null;
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col gap-4 bg-black p-4 text-white">
      {loaded ? (
        <div className="flex flex-wrap gap-x-0 gap-y-1 rounded-md bg-slate-900 p-2">
          {/* <span>今日未交作业: 114514</span> */}
          <div className="flex-1" data-tauri-drag-region></div>
          <button
            onClick={() => getCurrentWindow().hide()}
            title="最小化到托盘"
          >
            <X />
          </button>
        </div>
      ) : (
        <div className="flex-1">
          <Loading />
        </div>
      )}
      <Outlet />
      {loaded ? (
        <div className="flex flex-wrap gap-2 rounded-md bg-slate-900 p-2">
          {works.map((work) => (
            <button
              className={cn(
                "group flex shrink-0 rounded-md bg-slate-800 px-2 py-1 opacity-90 transition duration-300 ease-out hover:bg-slate-700",
                {
                  "bg-slate-700 opacity-100": id === work.id,
                },
              )}
              onClick={() => {
                navigate(`/work/${work.id}`);
              }}
              title={work.id}
            >
              {work.title}
              <div className="flex max-w-0 scale-0 transition-all duration-300 group-hover:max-w-32 group-hover:scale-100">
                <Pencil
                  onClick={() => {
                    const name = prompt("enter new name");
                    if (!name) {
                      return;
                    }
                    setWorks(
                      works.map((w) =>
                        w.id === work.id ? { ...w, title: name } : w,
                      ),
                    );
                  }}
                />
                <Delete
                  onClick={() => {
                    if (!confirm("r u sure?")) {
                      return;
                    }
                    setWorks(works.filter((w) => w.id !== work.id));
                  }}
                />
              </div>
            </button>
          ))}
          <button>
            <Plus
              onClick={() => {
                setWorks([
                  ...works,
                  {
                    id: crypto.randomUUID(),
                    title: "untitled",
                    data: Array(45).fill(true),
                  },
                ]);
              }}
            />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
