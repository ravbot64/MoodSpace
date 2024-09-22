import { Stack, Title } from "@mantine/core";
import { DonutChart } from "@mantine/charts";

export default function MoodPieChart({ data }) {
  return (
    <div>
      {data ? (
        <Stack gap="sm" mb={20}>
          <Title order={3} ta="center">
            Monthly Mood Data
          </Title>
          <DonutChart
            data={data}
            thickness={28}
            tooltipDataSource="segment"
            mx="auto"
          />
        </Stack>
      ) : (
        <div>No mood data found for this month.</div>
      )}
    </div>
  );
}
