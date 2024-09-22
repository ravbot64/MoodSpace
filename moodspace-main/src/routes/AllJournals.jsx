import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import { Grid, Card, Text, Button, Container, Title } from "@mantine/core";
import { useNavigate } from "react-router";
export default function AllJournals() {
  const [journals, setJournals] = useState(null);
  const token = useAuthStore((store) => store.token);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_VERCEL_FETCH}/v1/journal/`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setJournals(data.formattedJournals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);
  return (
    <Container fluid p={20}>
      <Title mb={20}>All Journals</Title>
      <Grid>
        {journals ? (
          <>
            {journals.map((journal) => (
              <Grid.Col key={journal._doc._id} p={10} span={4}>
                {" "}
                {/* Adjust column span as needed */}
                <Card p="lg" style={{ border: "3px solid #05372C" }}>
                  <Title order={3} mb={7}>
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
            ))}
          </>
        ) : (
          <Grid.Col>No Journal data available</Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
