import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SwiperCore, { EffectCoverflow, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Avatar,
  Spinner,
  IconButton,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { CloseIcon } from '@chakra-ui/icons';
import { useParams, Link, useHistory } from 'react-router-dom';
import { InView } from 'react-intersection-observer';
import { StoryCTXs } from '../components/StoryCTXs';
import { LikeAnimation } from '../components/LikeAnimation';
import {
  useLikeStoryMutation,
  useMeQuery,
  useStoryQuery,
  useWatchedMutation,
} from '../generated/graphql';

import 'swiper/swiper.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Autoplay]);

export const Stories = () => {
  const toast = useToast();
  dayjs.extend(relativeTime);
  const history = useHistory();
  const { storyId } = useParams<{ storyId: string }>();
  const { loading, data } = useStoryQuery({
    variables: { storyId },
  });
  const [likeStory] = useLikeStoryMutation();
  const { data: meData } = useMeQuery();
  const [watched] = useWatchedMutation();
  const likeShow = useDisclosure();

  return (
    <Flex justifyContent="center" my={5}>
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <Box position="relative">
            {data && data.story ? (
              <>
                <Flex alignItems="center" mb={5}>
                  <Avatar src={data.story.user.avatar!} mr={2} />
                  <Text as={Link} to={`/u/${data.story.user?._id}`} mr={2}>
                    @{data.story.user.username}
                  </Text>
                  <Text color="gray">
                    {dayjs(data.story.createdAt).fromNow()}
                  </Text>

                  <IconButton
                    ml="auto"
                    onClick={() => history.push('/')}
                    aria-label="close button"
                    icon={<CloseIcon />}
                  />
                </Flex>
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                >
                  <SwiperSlide>
                    <InView
                      as="div"
                      onChange={async (inView, entry) => {
                        if (
                          inView &&
                          meData &&
                          data &&
                          data.story &&
                          meData.me &&
                          meData.me._id !== data.story.user._id
                        ) {
                          await watched({
                            variables: { storyId: data!.story!._id },
                          });
                        }
                      }}
                    >
                      <Box position="relative">
                        {likeShow.isOpen ? (
                          <LikeAnimation onClose={likeShow.onClose} />
                        ) : null}
                        <img
                          style={{ margin: '0 auto' }}
                          src={data.story.image_url.replace(
                            '/upload',
                            '/upload/h_500'
                          )}
                          alt={data.story.filename}
                          onDoubleClick={async () => {
                            try {
                              await likeStory({
                                variables: {
                                  storyId: data?.story!._id,
                                },
                                update: (cache) => {
                                  cache.evict({
                                    id: 'Story:' + data?.story!._id,
                                  });
                                },
                              });
                              likeShow.onOpen();
                              toast({
                                title: 'Like Added!',
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                              });
                            } catch (e) {
                              toast({
                                title: 'Error Ocurred',
                                description: e.message,
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                              });
                            }
                          }}
                        />
                      </Box>
                    </InView>
                    <StoryCTXs me={meData?.me} story={data.story} />
                  </SwiperSlide>
                </Swiper>
              </>
            ) : (
              <Text>Sorry, No Story Found</Text>
            )}
          </Box>
        )}
      </Container>
    </Flex>
  );
};
