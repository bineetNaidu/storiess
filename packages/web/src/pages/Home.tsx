import { Container, Spinner, Wrap } from '@chakra-ui/react';
import { useStoriesQuery } from 'src/generated/graphql';
import { Story } from '../components/Story';

export const Home = () => {
  const { data, loading } = useStoriesQuery();
  return (
    <Container bgColor="#3c3f51" py={5}>
      {loading ? (
        <Spinner />
      ) : (
        <Wrap>
          {data && data.stories.map((u) => <Story key={u._id} user={u} />)}
        </Wrap>
      )}
    </Container>
  );
};
