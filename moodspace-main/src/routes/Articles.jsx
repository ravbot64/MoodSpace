import * as data from "../resources.json";
import BadgeCard from "../components/BadgeCard/BadgeCard";
import { Grid, Space, Title, Container } from "@mantine/core";
import article1 from "../assets/article1.jpg";
import article2 from "../assets/article2.jpg";
import article3 from "../assets/article3.jpg";
import article4 from "../assets/article4.jpg";

const imgData = [
  {
    id: "1",
    img: article1,
  },
  {
    id: "2",
    img: article2,
  },
  {
    id: "3",
    img: article3,
  },
  {
    id: "4",
    img: article4,
  },
];

export default function Articles() {
  const articles = data.articles.map((article, index) => {
    return (
      // Add the return statement
      <Grid.Col
        key={article.id}
        span={{ base: 12, md: 6, lg: 3 }}
        overflow="hidden"
      >
        <BadgeCard
          title={article.title}
          link={article.link}
          img={imgData[index].img}
          isBook={false}
          action="Read article"
        />
      </Grid.Col>
    );
  });
  return (
    <Container fluid p={20}>
      <Title order={1}>Articles</Title>
      <Space h="md" />
      <Grid gutter="lg">{articles}</Grid>
    </Container>
  );
}
