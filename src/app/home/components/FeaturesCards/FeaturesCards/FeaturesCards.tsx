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
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { NavigationProgress, nprogress } from '@mantine/nprogress';

export function FeaturesCards() {

  const supabase = createClientComponentClient<Database>()
  const [courses, setCourses] = useState<typeArticleCard[]>([])
  const currentsession = useSelector((state: RootState) => state.Session.currentSession)
  const user = currentsession?.user

  useEffect(() => {
    nprogress.start()
    async function geCourses() {
      if (user) {
        try {
          let { data: groups, error } = await supabase
            .from('user_group')
            .select(`*,groups(*)`)
            .eq('user_id', user?.id)
          if (error) throw error;
          if (groups && groups.length > 0) {
            const tempGroups = JSON.stringify(groups)
            const jsonGroups = JSON.parse(tempGroups)
            let { data: courses, error } = await supabase
              .from('group_course')
              .select(`*,courses(*)`)
              .eq('group_id', jsonGroups[0].groups.id)
            if (error) throw error;
            if (courses && courses.length > 0) {
              const tempCourses = JSON.stringify(courses)
              const jsonCourses = JSON.parse(tempCourses)
              const dataArticleCard: typeArticleCard[] = []
              jsonCourses.map((item: { courses: { name: any; description: any; folder_name: any; image_url: any; }; }) => {
                if (item.courses) {
                  const tempArticleCard: typeArticleCard = {
                    title: item.courses.name,
                    description: item.courses.description,
                    folder_name: item.courses.folder_name,
                    image_url: item.courses.image_url
                  }
                  dataArticleCard.push(tempArticleCard)
                }
              })
              setCourses(dataArticleCard)
              nprogress.complete()
            }
          }
        } catch (error) {

        }
      }
    }
    geCourses()

  }, [])


  const features = courses.map((feature, index) => (
    <div key={index}>
      <ArticleCard data={{
        title: feature.title,
        description: feature.description,
        folder_name: feature.folder_name,
        image_url: feature.image_url,
      }} />
    </div>
  ));

  return (
    <>
      <NavigationProgress />
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
    </>
  );
}
