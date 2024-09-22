import * as data from "../resources.json";
import BadgeCard from "../components/BadgeCard/BadgeCard";
import { Grid, Space, Title, Container } from "@mantine/core";
import sanjivini from "../assets/sanjivini.png";
import aasra from "../assets/aasra.png";
import vandrevala from "../assets/vandrevala.png";
import manntalks from "../assets/manntalks.png";
import mpowerminds from "../assets/mpowerminds.png";

const imgData = [
  {
    id: "1",
    img: sanjivini,
  },
  {
    id: "2",
    img: aasra,
  },
  {
    id: "3",
    img: vandrevala,
  },
  {
    id: "4",
    img: manntalks,
  },
  {
    id: "5",
    img: mpowerminds,
  },
];

export default function Organizations() {
  const organizations = data.organizations.map((organization, index) => {
    return (
      // Add the return statement
      <Grid.Col key={organization.id} span={{ base: 12, md: 6, lg: 4 }}>
        <BadgeCard
          title={organization.name}
          link={organization.link}
          description={organization.description}
          img={imgData[index].img}
          author={organization.author}
          action="Go to their website"
        />
      </Grid.Col>
    );
  });
  return (
    <Container fluid p={20}>
      <Title order={1}>Organizations</Title>
      <Space h="md" />
      <Grid gutter="lg">{organizations}</Grid>
    </Container>
  );
}
