import MoodPieChart from "../MoodPieChart/MoodPieChart";
import MoodSparkline from "../MoodSparkline/MoodSparkline";
import JournalList from "../JournalList/JournalList";
import useAuthStore from "../../stores/authStore";
import { useEffect, useState } from "react";
import { Container, Grid, Text, Title, Paper, SimpleGrid} from "@mantine/core";

const moodMapping = {
  1: { name: "Critical", color: "#d52941" },
  2: { name: "At-Risk", color: "#504f9d" },
  3: { name: "Low", color: "#e1f296" },
  4: { name: "Okay", color: "#70D560" },
  5: { name: "Excellent", color: "#05372C" },
};

export default function Home() {
  const token = useAuthStore((store) => store.token);
  const apiUrl = useAuthStore((store) => store.apiUrl);
  const [sparlineData, setSparklineData] = useState(null);
  const [monthlyMoodData, setMonthlyMoodData] = useState(null);
  const [avg, setAvg] = useState(0);
  const [maxMood, setMaxMood] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${apiUrl}/v1/mood/monthly/2024`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const moodCounts = {};
      data.moods.forEach((mood) => {
        moodCounts[mood.rating] = (moodCounts[mood.rating] || 0) + 1;
      });

      const ratings = data.moods.map((entry) => entry.rating);
      const scores = data.moods.map((entry) => entry.smfqScore);

      const sum = ratings.reduce((total, rating) => total + rating, 0);

      const averageRating = data.moods.length <= 0?0:sum / data.moods.length;
      setAvg(averageRating);

      const formattedData = Object.entries(moodCounts).map(
        ([rating, count]) => ({
          name: moodMapping[rating].name,
          value: count,
          color: moodMapping[rating].color,
        })
      );

      const maxEntry = formattedData.reduce(
        (max, entry) => (entry.value > max.value ? entry : max),
        { value: 0 } // Initial value with a very low 'value'
      );
      setMaxMood(maxEntry);
      setMonthlyMoodData(formattedData);
      setSparklineData(scores);
    };
    fetchData().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [token]);
  // const PRIMARY_COL_HEIGHT = rem(1200);
  // const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  return (
    <Container my="md" p={10} m={0} fluid bg="#f0f7f6">
      <Title mb={30} mt={30}>
        My Dashboard
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Paper radius="md" p={20} bg="#fff">
          <Title order={2} mb={20}>
            Your Journals
          </Title>
          <JournalList />
        </Paper>
        <Grid gutter="md" grow>
          <Grid.Col span={6}>
            <Paper withBorder radius="md" bg="#D52941" p={20}>
              <Title order={1} c="white">
                {avg.toFixed(1)}
              </Title>
              <Text size="sm" fw={500} c="#DCD6F7">
                Average Mood Rating
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper withBorder radius="md" bg="#504F9D" p={20}>
              <Title order={1} c="white">
                {maxMood.value} {`${maxMood.value==1?"time":"times"}`}
              </Title>
              <Text size="sm" fw={500} c="#DCD6F7">
                you had a <Text fw={700} c="white" span inherit>{maxMood.name}</Text> mood
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper p={10}>
              <MoodPieChart data={monthlyMoodData} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper p={10}>
              <MoodSparkline data={sparlineData} />
            </Paper>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
