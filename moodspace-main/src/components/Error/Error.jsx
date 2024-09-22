import { Container, Title, Text, Button, Group } from "@mantine/core";
import classes from "./error.module.css";
import { useViewportSize } from "@mantine/hooks";
import { Link } from "react-router-dom";

export default function Error() {
  const { height, width } = useViewportSize();
  return (
    <Container h={height} bg="#f0f7f6">
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          <Link to="/" style={{ textDecoration: "none" }}>
            Take me back to home page
          </Link>
        </Button>
      </Group>
    </Container>
  );
}
