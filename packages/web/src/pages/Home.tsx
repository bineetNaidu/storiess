import { useEffect } from 'react';
import {
  Container,
  Spinner,
  Text,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react';
import { useStoriesQuery } from 'src/generated/graphql';
import { Story } from '../components/Story';
import { Header } from '../components/Header';
import { NewToSiteModal } from '../components/NewToSiteModal';

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, refetch } = useStoriesQuery();

  useEffect(() => {
    const nts = localStorage.getItem('stories:nts');
    if (nts === 'true') {
      onOpen();
    }
  }, [onOpen]);
  return (
    <Container bgColor="#3c3f51" py={5} rounded="md">
      <Header refetch={refetch} />
      <NewToSiteModal onClose={onClose} isOpen={isOpen} />
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
