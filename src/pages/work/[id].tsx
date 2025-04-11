import { Button, Flex } from "antd";
import { useMemo } from "react";
import students from "../../data/students.json";
import { useParams } from "../../router";
import { Work } from "../../types";
import { useStore } from "../store";

export default function WorkPage() {
  const { id } = useParams("/work/:id");
  const [works, setWorks] = useStore<Work[]>("works", []);
  const work = useMemo(() => works.find((work) => work.id === id), [id, works]);

  return (
    <Flex justify="center" align="center" style={{ height: "100%" }}>
      <Flex
        justify="center"
        align="center"
        wrap
        gap={16}
        style={{ maxWidth: 700 }}
      >
        {work?.data.map((value, index) => (
          <Button
            size="large"
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
            {index + 1} {students[index]}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
