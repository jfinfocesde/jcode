import { Container, Title, Text, Button, Group } from '@mantine/core';
import classes from './HeroImageRight.module.css';

export function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              {' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                JCODE
              </Text>{' '}
              Doc
            </Title>
            <Text className={classes.description} mt={30}>
              JCODE es tu solución definitiva para la documentación de código, proporcionando una plataforma intuitiva y potente para crear, gestionar y compartir documentación de manera eficiente, transformando la documentación en una experiencia agradable y fluida.
            </Text>
            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="sm"
              className={classes.control}
              mt={40}
            >
              Características
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
