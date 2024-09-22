import HeroComponent from "../components/Hero/Hero";
import { Container } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import { useViewportSize } from "@mantine/hooks";

export default function Hero() {
  const { height, width } = useViewportSize();
  return (
    <Container
      fluid
      p={0}
      h={height}
      style={{ overflow:"hidden"}}
    >
      <Navbar />
      <HeroComponent />
    </Container>
  );
}
