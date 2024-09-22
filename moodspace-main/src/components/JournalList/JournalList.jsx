import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import {
  Grid,
  Card,
  Text,
  Button,
  Skeleton,
  Container,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router";

export default function JournalList() {
  const [journals, setJournals] = useState(null);
  const [len, setLen] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((store) => store.token);
  const apiUrl = useAuthStore((store) => store.apiUrl);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/v1/journal/limit`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // Use await here
        console.log(data);
        setLen(data.formattedJournals.length);
        const limitedJournals = data.formattedJournals.slice(0, 2);
        setJournals(limitedJournals);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <Container fluid>
      <Grid>
        {isLoading ? (
          [1, 2, 3].map(
            (
              index
            ) => (
              <Grid.Col span={4} key={`skeleton-${index}`}>
                <Card shadow="sm" p="lg">
                  <Skeleton height={20} radius="md" mb="sm" />
                  <Skeleton height={8} radius="md" width="70%" mb="sm" />
                  <Skeleton height={8} radius="md" width="50%" />
                  <Skeleton height={30} radius="md" mt="md" />
                </Card>
              </Grid.Col>
            )
          )
        ) : journals&&journals?.length ? (
          journals.map((journal) => (
            <Grid.Col key={journal._doc._id} p={10}>
              {" "}
              {/* Adjust column span as needed */}
              <Card p="md" style={{ border: "1px dotted #05372C" }}>
                <Title order={4}>
                  {journal._doc.title
                    ? journal._doc.title
                    : "Title not available"}
                </Title>

                <Text size="sm">{journal.preview}...</Text>

                <Button
                  variant="filled"
                  color="#504F9D"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() =>
                    navigate(`/dashboard/journal/${journal._doc._id}`)
                  }
                >
                  See Full Journal
                </Button>
              </Card>
            </Grid.Col>
          ))
        ) : (
          <Grid.Col><Text size="xl">No Journal data available</Text></Grid.Col>
        )}
        {len > 2 ? (
          <Grid.Col>
            <Button
              fullWidth
              mt={10}
              onClick={() => navigate("/dashboard/journal/all")}
              bg="#D52941"
            >
              See All Journals
            </Button>
          </Grid.Col>
        ) : null}
      </Grid>
    </Container>
  );
}
