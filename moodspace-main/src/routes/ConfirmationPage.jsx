import {
  Text,
  Title,
  Button,
  Card,
  Group,
  Image,
  Container,
  Center,
  Grid,
} from "@mantine/core";
import { useNavigate, useLocation, Link } from "react-router-dom";
import classes from "../styles/confirmation.module.css";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, label } = location.state;
  return (
    <Container mt={130}>
      <Center>
        <Card withBorder padding="lg" className={classes.card} w={650}>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              alt="Running challenge"
              height={200}
            />
          </Card.Section>

          <Group justify="space-between" mt="xl">
            <Title ml="auto" mr="auto" mb="md">
              Your Result
            </Title>
          </Group>
          <Grid justify="space-around" pl="lg" pr="lg" mb="lg">
            <Grid.Col span={3}>
              <Title order={1} c="#D52941">
                {score}
              </Title>
              <Text size="xl" c="dimmed">
                SMFQ Score
              </Text>
            </Grid.Col>
            <Grid.Col span={3} offset={6}>
              <Title order={1} c="#504F9D">
                {label}
              </Title>
              <Text size="xl" c="dimmed">
                Mood
              </Text>
            </Grid.Col>
          </Grid>
          {label === "Critical" && (
            <>
              <Text
                size="xl"
                c="red"
                ml="auto"
                mr="auto"
                mb="xs"
                fw={700}
                tt="capitalize"
              >
                You might need urgent help. Please see these resources:
              </Text>
              <Grid justify="center" mb="sm">
                <Grid.Col span={4} mr={60}>
                  <Button bg="#504F9D" ho>
                    <Link
                      component="a"
                      to="/dashboard/resources/organizations"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      View Mental Health Organizations
                    </Link>
                  </Button>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button bg="#504F9D">
                    <Link
                      component="a"
                      to="/dashboard/resources/helpline"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      View Helpline Numbers
                    </Link>
                  </Button>
                </Grid.Col>
              </Grid>
            </>
          )}
          <Button
            variant="gradient"
            gradient={{ from: "#05372C", to: "#70D560", deg: 90 }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Go to Dashboard
          </Button>
        </Card>
      </Center>
    </Container>
  );
}
