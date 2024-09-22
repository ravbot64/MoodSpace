import { Container, Group, Burger, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import classes from "./navbar.module.css";

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Title order={3} className={classes.logo}>
            <Link to="/" style={{ textDecoration: "none", color: "#fdfefe" }}>
              MoodSpace
            </Link>
          </Title>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Group visibleFrom="xs">
            <Button component={Link} to="/login" bg="#504F9D">
              Login
            </Button>
            <Button component={Link} to="/register" bg="#D52941">
              Register
            </Button>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
