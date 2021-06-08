import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Autoplay } from 'swiper/core';
import { Avatar, Spinner, IconButton } from '@chakra-ui/react';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { useParams, useHistory } from 'react-router-dom';
import { useUserQuery } from '../generated/graphql';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import { CloseIcon } from '@chakra-ui/icons';
// import 'swiper/components/pagination/pagination.min.css';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Autoplay]);

export const Stories = () => {
  const [time, setTime] = useState('');
  dayjs.extend(relativeTime);
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const { loading, data } = useUserQuery({
    variables: { id: userId },
  });

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
                <>
                  <SwiperSlide key={story._id}>
                    <img
                      style={{ margin: '0 auto' }}
                      src={story.image_url.replace('/upload', '/upload/h_500')}
                      alt={story.filename}
                      onFocus={() => setTime(story.createdAt)}
                    />
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </Box>
        )}
      </Container>
    </Flex>
  );
};
