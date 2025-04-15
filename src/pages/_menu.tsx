import { DeleteOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Menu, Modal, Popconfirm } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import students from "../data/students.json";
import { Work } from "../types";
import { useStore } from "./store";

export default function MyMenu() {
  const [works, setWorks] = useStore<Work[]>("works", []);
  const [openNewWOrkModal, setOpenNewWorkModal] = useState(false);
  const [newWorkName, setNewWorkName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onModalOk = () => {
    const id = crypto.randomUUID();
    setWorks([
      ...works,
      {
        id,
        title: newWorkName,
        data: Array.from({ length: students.length }, () => true),
      },
    ]);
    setNewWorkName("");
    setOpenNewWorkModal(false);
    navigate(`/work/${id}`);
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
              <Popconfirm
                title="删除作业"
                description="确认删除该作业？"
                onConfirm={() => {
                  setWorks(works.filter((w) => w.id !== work.id));
                }}
              >
                <Button
                  variant="text"
                  color="danger"
                  icon={<DeleteOutlined />}
                  style={{ marginRight: -12 }}
                />
              </Popconfirm>
            ),
          })),
        ]}
      />
      <Modal
        open={openNewWOrkModal}
        width={300}
        title="新建作业"
        onCancel={() => setOpenNewWorkModal(false)}
        onOk={onModalOk}
      >
        <Input
          placeholder="作业名称"
          value={newWorkName}
          onChange={(e) => setNewWorkName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onModalOk();
            }
          }}
        />
      </Modal>
    </>
  );
}
