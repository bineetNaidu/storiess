import request from 'graphql-request';
import { graphql } from '../lib/gql_generated/gql';
import { useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Spinner,
  Text,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react';
import { Story } from '../components/Story';
import { NewToSiteModal } from '../components/NewToSiteModal';
import { Header } from '../components/Header';
import { GetServerSideProps, NextPageContext } from 'next';
import { meQuery, storiesQuery } from '../lib/queries';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await request('http://localhost:4000/graphql', meQuery);

  if (!data.me)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  return {
    props: {
      me: data.me,
    },
  };
};

export default function Home(props: any) {
  const {
    isOpen: isNTSmodalOpen,
    onOpen: onNTSModalopen,
    onClose: onNTSModalclose,
  } = useDisclosure();
  const {
    data: storiesData,
    isLoading: isStoriesDataLoading,
    refetch,
  } = useQuery(['stories'], async () =>
    request('http://localhost:4000/graphql', storiesQuery)
  );
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      const isNewToStory = localStorage.getItem('stories:nts');
      if (!isNewToStory) {
        localStorage.setItem('stories:nts', 'true');
        onNTSModalopen();
      }
      isMounted.current = true;
      return;
    }
  }, [onNTSModalopen]);
  return (
    <Layout>
      <Container bgColor="#3c3f51" py={5} rounded="md" color="HighlightText">
        <NewToSiteModal onClose={onNTSModalclose} isOpen={isNTSmodalOpen} />
        <Header refetchStories={refetch} />
        <Text fontSize="2xl" fontWeight="bold">
          Stories
        </Text>
        {isStoriesDataLoading ? (
          <Spinner />
        ) : (
          <Wrap mt={4}>
            {storiesData &&
              storiesData.stories.map((s: any) => (
                <Story key={s._id} story={s} />
              ))}
          </Wrap>
        )}
      </Container>
    </Layout>
  );
}
