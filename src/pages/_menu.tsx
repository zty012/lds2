import {
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Modal } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import students from "../data/students.json";
import { Work } from "../types";
import { useStore } from "./store";

export default function MyMenu() {
  const [works, setWorks] = useStore<Work[]>("works", []);
  const [openNewWorkModal, setOpenNewWorkModal] = useState(false);
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [renameWorkId, setRenameWorkId] = useState("");
  const [modalInputValue, setModalInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onNewWorkModalOk = () => {
    const id = crypto.randomUUID();
    setWorks([
      ...works,
      {
        id,
        title: modalInputValue,
        data: Array.from({ length: students.length }, () => true),
      },
    ]);
    setModalInputValue("");
    setOpenNewWorkModal(false);
    navigate(`/work/${id}`);
  };

  const onRenameWorkModalOk = () => {
    setWorks(
      works.map((work) => {
        if (work.id === renameWorkId) {
          return {
            ...work,
            title: modalInputValue,
          };
        }
        return work;
      })
    );
    setModalInputValue("");
    setOpenRenameModal(false);
  };

  return (
    <>
      <Menu
        style={{ height: "100%" }}
        selectedKeys={[location.pathname]}
        items={[
          {
            key: "/",
            label: "首页",
            icon: <HomeOutlined />,
            onClick: () => navigate("/"),
          },
          { type: "divider" },
          {
            key: "new",
            label: "新建作业",
            icon: <PlusOutlined />,
            onClick: () => setOpenNewWorkModal(true),
          },
          { type: "divider" },
          ...works.map((work) => ({
            key: `/work/${work.id}`,
            label: work.title,
            onClick: () => navigate(`/work/${work.id}`),
            extra: (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: "重命名",
                      key: "rename",
                      icon: <EditOutlined />,
                      onClick: () => {
                        setRenameWorkId(work.id);
                        setOpenRenameModal(true);
                      },
                    },
                    {
                      label: "删除",
                      key: "delete",
                      icon: <DeleteOutlined />,
                      style: { color: "red" },
                      onClick: () => {
                        setWorks(works.filter((w) => w.id !== work.id));
                      },
                    },
                  ],
                }}
              >
                <Button
                  variant="text"
                  type="text"
                  icon={<MoreOutlined />}
                  style={{ marginRight: -12 }}
                />
              </Dropdown>
            ),
          })),
        ]}
      />
      <Modal
        open={openNewWorkModal}
        width={300}
        title="新建作业"
        onCancel={() => {
          setOpenNewWorkModal(false);
          setModalInputValue("");
        }}
        onOk={onNewWorkModalOk}
      >
        <Input
          placeholder="作业名称"
          value={modalInputValue}
          onChange={(e) => setModalInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onNewWorkModalOk();
            }
          }}
        />
      </Modal>
      <Modal
        open={openRenameModal}
        width={300}
        title="重命名"
        onCancel={() => {
          setOpenRenameModal(false);
          setModalInputValue("");
        }}
        onOk={() => {
          setWorks(
            works.map((work) =>
              work.id === renameWorkId
                ? {
                    ...work,
                    title: modalInputValue,
                  }
                : work
            )
          );
          setOpenRenameModal(false);
        }}
      >
        <Input
          placeholder="作业名称"
          value={modalInputValue}
          onChange={(e) => setModalInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRenameWorkModalOk();
            }
          }}
        />
      </Modal>
    </>
  );
}
