import {
  Card,
  Image,
  Text,
} from '@mantine/core';
import classes from './ArticleCard.module.css';
import Link from 'next/link';

export interface typeArticleCard {
  title: string | null,
  description: string | null,
  route: string | null,
  image_url: string | null,
}

export function ArticleCard({ data }: { data: typeArticleCard }) {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link href={data.route ? `/home/content/courses/${data.route}`: ""} >
          <Image src={data.image_url} height={180} />
        </Link>
      </Card.Section>
      <Text className={classes.title} fw={500}>
        {data.title}
      </Text>
      <Text fz="sm" c="dimmed" >
        {data.description}
      </Text>
    </Card>
  );
}
