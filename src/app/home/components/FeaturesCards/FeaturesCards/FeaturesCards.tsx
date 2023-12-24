import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';
import { ArticleCard, typeArticleCard } from '../../ArticleCard/ArticleCard/ArticleCard';


const mockdata = [
  {
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    icon: IconGauge,
    route:'/home/content/courses/test',
    image_url: "https://www.computerworld.es/archivos/202205/java-concurrency.png",
    autor: "Jhon Valencia"
  },
  {
    title: 'Python',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    icon: IconUser,
    route:'/home/content/courses/java',
    image_url: "https://d29jy8ovkd5kcx.cloudfront.net/wp-content/uploads/2021/11/29093822/shutterstock_1447245065-1.jpg",
    autor: "Jhon Valencia"
  },
  {
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
    icon: IconCookie,
    route:'/home/content/courses/test',
    image_url: "https://www.computerworld.es/archivos/202205/java-concurrency.png",
    autor: "Jhon Valencia"
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (



    <ArticleCard data={{
      title: feature.title,
      description: feature.description,
      route:feature.route,
      image_url: feature.image_url,
      autor: feature.autor,
    }} />
    // <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
    //   <feature.icon
    //     style={{ width: rem(50), height: rem(50) }}
    //     stroke={2}
    //     color={theme.colors.blue[6]}
    //   />
    //   <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
    //     {feature.title}
    //   </Text>
    //   <Text fz="sm" c="dimmed" mt="sm">
    //     {feature.description}
    //   </Text>
    // </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Bienvenidos
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Cursos Disponibles
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
        hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
