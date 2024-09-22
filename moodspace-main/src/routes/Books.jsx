import * as data from "../resources.json";
import BadgeCard from "../components/BadgeCard/BadgeCard";
import { Grid, Space, Title, Container } from "@mantine/core";
import habits from "../assets/7habits.jpeg";
import body from "../assets/bodykeepsthescore.jpeg";
import dialect from "../assets/dialectical.jpeg";
import hope from "../assets/hopeandhelp.jpeg";
import maybe from "../assets/maybeyoushould.jpeg";
import tuesday from "../assets/tuesdays.png";

const imgData = [
  {
    id: "1",
    img: body,
  },
  {
    id: "2",
    img: hope,
  },
  {
    id: "3",
    img: maybe,
  },
  {
    id: "4",
    img: tuesday,
  },
  {
    id: "5",
    img: habits,
  },
  {
    id: "6",
    img: dialect,
  },
];

export default function Books() {
  const books = data.books.map((book, index) => {
    return (
      // Add the return statement
      <Grid.Col key={book.id} span={{ base: 12, md: 6, lg: 4 }}>
        <BadgeCard
          title={book.title}
          link={book.link}
          description={book.description}
          img={imgData[index].img}
          author={book.author}
          action="Buy Book"
        />
      </Grid.Col>
    );
  });
  return (
    <Container fluid p={20}>
      <Title order={1}>Books</Title>
      <Space h="md" />
      <Grid gutter="lg">{books}</Grid>
    </Container>
  );
}
