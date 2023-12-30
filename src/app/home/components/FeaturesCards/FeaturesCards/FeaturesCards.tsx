import {
  Badge,
  Group,
  Title,
  Text,
  SimpleGrid,
  Container,
} from '@mantine/core';
import classes from './FeaturesCards.module.css';
import { ArticleCard, typeArticleCard } from '../../ArticleCard/ArticleCard/ArticleCard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase/supabase';
import { useEffect, useState } from 'react';


export function FeaturesCards() {

  const supabase = createClientComponentClient<Database>()
  const [courses, setCourses] = useState<typeArticleCard[]>([])

  // useEffect(() => {

  //   async function getCourses() {
  //     try {
  //       let { data: courses, error } = await supabase
  //         .from('courses')
  //         .select("*")

  //       if (error) throw error;

  //       if (courses && courses.length > 0) {
  //         const data = courses.map((item) => {
  //           const temp: typeArticleCard = {
  //             title: item.name,
  //             description: item.description,
  //             folder_name: item.folder_name,
  //             image_url: item.image_url
  //           }
  //           return temp
  //         })

  //         setCourses(data)
  //       }
  //       else {

  //       }
  //     } catch (error) {

  //     } finally {

  //     }
  //   }
  //   getCourses();

  // }, [])

  const features = courses.map((feature) => (
    <ArticleCard data={{
      title: feature.title,
      description: feature.description,
      folder_name: feature.folder_name,
      image_url: feature.image_url,
    }} />
  ));

  return (
    <Container size="md" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Bienvenidos
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Cursos Disponibles
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Descubre los cursos disponibles y comienza tu viaje de aprendizaje.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
