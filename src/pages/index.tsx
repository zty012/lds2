import { getTauriVersion, getVersion } from "@tauri-apps/api/app";
import { Card, Col, Flex, Row, Typography } from "antd";
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
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title>lds 的精神制裁</Typography.Title>
          <Typography>By 初一20班 zty</Typography>
        </Col>
        <Col span={12}>
          <Card title="应用版本">{version}</Card>
        </Col>
        <Col span={12}>
          <Card title="框架版本">{tauriVersion}</Card>
        </Col>
        <Col span={24}>
          <Card title="更新内容">
            <p>支持重命名作业</p>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
}
