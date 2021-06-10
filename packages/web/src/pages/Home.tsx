import { Container, Spinner, Text, Wrap } from '@chakra-ui/react';
import { useStoriesQuery } from 'src/generated/graphql';
import { Story } from '../components/Story';
import { Header } from '../components/Header';

export const Home = () => {
  const { data, loading } = useStoriesQuery();
  return (
    <Container bgColor="#3c3f51" py={5} rounded="md">
      <Header />
      <Text fontSize="2xl" fontWeight="bold">
        Stories
      </Text>
      {loading ? (
        <Spinner />
      ) : (
        <Wrap mt={4}>
          {data &&
            data.stories.map((s: any) => <Story key={s._id} story={s} />)}
        </Wrap>
      )}
    </Container>
  );
};
