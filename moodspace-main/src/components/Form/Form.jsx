import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Grid,
  Image,
  Container,
  Notification,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./Form.module.css";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";

export default function Form({
  type,
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  img,
  loading, // Accept loading state as prop
}) {
  const { height } = useViewportSize();
  const newH = height * 0.926;
  const [error, setError] = useState(null);
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(e);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container fluid p={0} h={height * 0.95}>
      <Grid>
        <Grid.Col span={6} pr={0}>
          <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={50} h={newH}>
              <Title
                order={2}
                className={classes.title}
                ta="center"
                mt="md"
                mb={50}
              >
                {type === "Login"
                  ? "Welcome back to MoodSpace"
                  : "Welcome to Moodspace, Register"}
              </Title>
              <TextInput
                label="Username"
                name="username"
                value={username}
                placeholder="Ex: Jack-8"
                size="md"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              {setEmail ? (
                <TextInput
                  label="Email address"
                  name="email"
                  value={email}
                  placeholder="hello@gmail.com"
                  size="md"
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : null}
              <PasswordInput
                label="Password"
                name="password"
                value={password}
                placeholder="Your password"
                mt="md"
                size="md"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                mt="xl"
                size="md"
                onClick={handleSubmit}
                loading={loading} // Use loading prop to show spinner
                variant="gradient"
                gradient={{ from: "#05372C", to: "#70D560", deg: 90 }}
                disabled={loading} // Disable the button while loading
              >
                {type === "Login" ? "Login" : "Register"}
              </Button>

              {type === "Login" ? (
                <Text ta="center" mt="md">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">Register</Link>
                </Text>
              ) : (
                <Text ta="center" mt="md">
                  Already have an account? <Link to="/login">Login</Link>
                </Text>
              )}

              {error && (
                <Notification
                  icon={xIcon}
                  color="red"
                  title="Error!"
                  withCloseButton={false}
                  mt="md"
                  bg="#F6F7F8"
                >
                  {error}
                </Notification>
              )}
            </Paper>
          </div>
        </Grid.Col>
        <Grid.Col span={6} pl={0}>
          <Image src={img} height={newH} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
