import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  Spoiler,
  Center,
} from "@mantine/core";
import classes from "./card.module.css";

export default function BadgeCard({
  title,
  link,
  description,
  img,
  author,
  isBook,
  action,
}) {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Center bg="var(--mantine-color-gray-light)">
          {isBook ? (
            <Image src={img} alt={title} w="auto" fit="contain" radius="md" />
          ) : (
            <Image src={img} alt={title} />
          )}
        </Center>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          {isBook ? (
            <Badge size="sm" variant="light">
              {author}
            </Badge>
          ) : null}
        </Group>
        <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
          {description}
        </Spoiler>
      </Card.Section>

      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          component="a"
          href={link}
          target="_blank"
          variant="gradient"
          gradient={{ from: "#05372C", to: "#70D560", deg: 90 }}
        >
          {action}
        </Button>
      </Group>
    </Card>
  );
}
