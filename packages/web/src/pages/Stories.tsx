import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SwiperCore, { EffectCoverflow, Autoplay } from 'swiper/core';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar, Spinner, IconButton, useToast } from '@chakra-ui/react';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { CloseIcon, Icon, EditIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import {
  useLikeStoryMutation,
  useMeQuery,
  useRemoveLikeMutation,
  useUserQuery,
} from '../generated/graphql';
import { FcLike } from 'react-icons/fc';
import { HiShare } from 'react-icons/hi';
import { BsBookmarks } from 'react-icons/bs';

import 'swiper/swiper.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Autoplay]);

export const Stories = () => {
  const toast = useToast();
  const [time, setTime] = useState('');
  dayjs.extend(relativeTime);
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const { loading, data } = useUserQuery({
    variables: { id: userId },
  });
  const [likeStory] = useLikeStoryMutation();
  const { data: meData } = useMeQuery();
  const [removeLike] = useRemoveLikeMutation();

  useEffect(() => {
    if (!loading && !data) {
      history.push('/');
    }
  }, [loading, history, data]);

  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <Box position="relative">
            <Flex alignItems="center" mb={5}>
              <Avatar src={data?.user?.avatar!} mr={2} />
              <Text mr={2}>@{data?.user?.username}</Text>
              <Text color="gray">{dayjs(time).fromNow()}</Text>

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
              autoplay={{
                delay: 2000,
              }}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
            >
              {data?.user?.stories.map((story) => (
                <SwiperSlide key={story._id}>
                  <img
                    style={{ margin: '0 auto' }}
                    src={story.image_url.replace('/upload', '/upload/h_500')}
                    alt={story.filename}
                    onFocus={() => setTime(story.createdAt)}
                    onDoubleClick={async () => {
                      try {
                        await likeStory({
                          variables: {
                            storyId: story._id,
                          },
                          update: (cache) => {
                            cache.evict({ id: 'User:' + data.user?._id });
                          },
                        });
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
                  <Box mt={3}>
                    <IconButton
                      p={2}
                      mx={1}
                      aria-label="total likes"
                      bgColor={story.likeStatus ? 'red.700' : undefined}
                      onClick={async () => {
                        try {
                          await removeLike({
                            variables: {
                              storyId: story._id,
                            },
                            update: (cache) => {
                              cache.evict({ id: 'User:' + data.user?._id });
                            },
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
                      icon={
                        <>
                          <Icon as={FcLike} />
                          <Text ml={1}>{story.likes.length}</Text>
                        </>
                      }
                    />
                    <IconButton
                      p={2}
                      mx={1}
                      aria-label="share"
                      icon={<Icon as={HiShare} />}
                    />
                    <IconButton
                      p={2}
                      mx={1}
                      aria-label="bookmark"
                      icon={<Icon as={BsBookmarks} />}
                    />
                    {meData?.me && meData.me._id === data.user?._id ? (
                      <IconButton
                        p={2}
                        mx={1}
                        aria-label="Edit Story button"
                        icon={<EditIcon />}
                      />
                    ) : null}
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
      </Container>
    </Flex>
  );
};
