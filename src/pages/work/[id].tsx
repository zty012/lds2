import { Button, Col, Flex, Row, Typography } from "antd";
import { useMemo } from "react";
import { useWindowSize } from "react-use";
import students from "../../data/students.json";
import { useParams } from "../../router";
import { Work } from "../../types";
import { useStore } from "../store";

export default function WorkPage() {
  const { id } = useParams("/work/:id");
  const [works, setWorks] = useStore<Work[]>("works", []);
  const work = useMemo(() => works.find((work) => work.id === id), [id, works]);
  const windowSize = useWindowSize();

  return (
    <Flex
      justify="center"
      align="center"
      vertical
      style={{ height: "100%", position: "relative" }}
    >
      <Typography.Title style={{ fontSize: windowSize.height / 16 }}>
        {work?.title}
      </Typography.Title>
      <Row
        gutter={[0, 16]}
        style={{
          maxWidth: "80vw",
        }}
      >
        {work?.data.map((value, index) => (
          <Col span={4}>
            <Flex
              gap={8}
              align="center"
              style={{
                zoom: windowSize.height / 32 / 16,
              }}
            >
              <Button
                size="large"
                shape="circle"
                color={value ? "green" : "red"}
                variant={value ? "outlined" : "solid"}
                autoInsertSpace={false}
                onClick={() => {
                  setWorks(
                    works.map((work) => {
                      if (work.id === id) {
                        return {
                          ...work,
                          data: work.data.map((v, i) => (i === index ? !v : v)),
                        };
                      }
                      return work;
                    })
                  );
                }}
              >
                {index + 1}
              </Button>
              <Typography style={{ fontSize: 16 }}>
                {students[index]}
              </Typography>
            </Flex>
          </Col>
        ))}
      </Row>
      <Typography
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          color: work?.data.filter((value) => !value).length ? "red" : "green",
          fontSize: windowSize.height / 32,
        }}
      >
        未交数量：{work?.data.filter((value) => !value).length}
      </Typography>
    </Flex>
  );
}
