import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Radio,
  Button,
  Title,
  Paper,
  Group,
  Text,
  Mark,
  List,
} from "@mantine/core";
import useAuthStore from "../../stores/authStore";

const statements = [
  {
    id: 0,
    statement: " I feet miserable or unhappy.",
  },
  {
    id: 1,
    statement: "I don’t enjoy anything at all.",
  },
  {
    id: 2,
    statement: "I feel so tired I just sat around and did nothing.",
  },
  {
    id: 3,
    statement: "I am very restless.",
  },
  {
    id: 4,
    statement: "I feel I am no good anymore.",
  },
  {
    id: 5,
    statement: "I cry a lot. ",
  },
  {
    id: 6,
    statement: "I find it hard to think properly or concentrate.",
  },
  {
    id: 7,
    statement: "I hate myself.",
  },
  {
    id: 8,
    statement: "I am a bad person.",
  },
  {
    id: 9,
    statement: "I feel lonely.",
  },
  {
    id: 10,
    statement: "I think nobody really loves me.",
  },
  {
    id: 11,
    statement: "I think I can never be as good as other people.",
  },
  {
    id: 12,
    statement: "I do everything wrong.",
  },
];

export default function MoodTracker() {
  const [answers, setAnswers] = useState(Array(statements.length).fill(0));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((store) => store.token);
  const apiUrl = useAuthStore((store) => store.apiUrl);

  const handleChange = (quesInd, value) => {
    setAnswers((prev) => {
      const newArray = [...prev];
      newArray[quesInd] = value;
      return newArray;
    });
  };

  async function handleFetch(score, label, moodRating) {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/v1/mood`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ moodRating, score }),
      });

      if (!response.ok) {
        throw new Error("Unable to add Mood");
      }
      navigate("/dashboard/mood/confirm", { state: { score, label } });
    } catch (err) {
      console.log(err);
      navigate("/dashboard/mood");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    const score = answers.reduce((ans, curr) => ans + curr, 0);
    let moodRating = 0;
    let label = "";
    if (score >= 0 && score <= 5) {
      moodRating = 5;
      label = "Excellent";
    } else if (score >= 6 && score <= 10) {
      moodRating = 4;
      label = "Okay";
    } else if (score >= 11 && score <= 15) {
      moodRating = 3;
      label = "Low";
    } else if (score >= 16 && score <= 20) {
      moodRating = 2;
      label = "At-Risk";
    } else {
      moodRating = 1;
      label = "Critical";
    }
    handleFetch(score, label, moodRating);
  };

  const items = statements.map((st) => (
    <Paper key={st.id} p="md" mb="sm" withBorder shadow="md">
      <Radio.Group
        key={st.id}
        name={`statement-${st.id}`}
        label={st.statement}
        onChange={(event) => {
          handleChange(st.id, parseInt(event));
        }}
        size="xl"
        ml="lg"
      >
        <Group mt="xs">
          <Radio
            value="0"
            label="Not true"
            defaultChecked
            size="lg"
            iconColor="dark.8"
            color="lime.4"
          />
          <Radio
            value="1"
            label="Sometimes"
            size="lg"
            iconColor="dark.8"
            color="lime.4"
          />
          <Radio
            value="2"
            label="True"
            size="lg"
            iconColor="dark.8"
            color="lime.4"
          />
        </Group>
      </Radio.Group>
    </Paper>
  ));

  return (
    <Container p="lg">
      <Title mb="lg">Mood Tracker</Title>
      <Text size="lg" mb="md" fw={700}>
        This form asks how you&apos;ve been feeling recently.
      </Text>
      <Text size="lg" mb="md">
        For each question, please check (&#x2713;) how you have been feeling or
        acting.
      </Text>
      <List size="lg" withPadding mb="lg">
        <List.Item>
          If a statement was not true about you, check{" "}
          <Mark color="green">NOT TRUE</Mark>.
        </List.Item>
        <List.Item>
          If a statement was only sometimes true, check{" "}
          <Mark color="green">SOMETIMES</Mark>.
        </List.Item>
        <List.Item>
          If a statement was true about you most of the time, check{" "}
          <Mark color="green">TRUE</Mark>.
        </List.Item>
      </List>

      <Text size="lg"></Text>
      <Text size="lg"></Text>
      {items}
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="gradient"
        gradient={{ from: "#05372C", to: "#70D560", deg: 90 }}
        mt="xl"
        loading={loading}
        disabled={loading}
      >
        <Title order={4}>Submit</Title>
      </Button>
    </Container>
  );
}
