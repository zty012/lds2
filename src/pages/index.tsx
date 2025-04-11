import { getTauriVersion, getVersion } from "@tauri-apps/api/app";
import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [version, setVersion] = useState("");
  const [tauriVersion, setTauriVersion] = useState("");

  useEffect(() => {
    getVersion().then((v) => {
      setVersion(v);
    });
    getTauriVersion().then((v) => {
      setTauriVersion(v);
    });
  }, []);

  return (
    <Flex
      justify="center"
      align="center"
      vertical
      gap={4}
      style={{ height: "100%" }}
    >
      <Typography.Title>lds 的精神制裁</Typography.Title>
      <Typography.Paragraph>应用版本: {version}</Typography.Paragraph>
      <Typography.Paragraph>框架版本: {tauriVersion}</Typography.Paragraph>
    </Flex>
  );
}
