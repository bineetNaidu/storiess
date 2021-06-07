import { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { EffectCoverflow } from 'swiper/core';
import { Avatar, Spinner } from '@chakra-ui/react';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { useParams, useHistory } from 'react-router-dom';
import { useUserQuery } from '../generated/graphql';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
// import 'swiper/components/pagination/pagination.min.css';

// install Swiper modules
SwiperCore.use([EffectCoverflow]);

export const Stories = () => {
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
          <Box>
            <Flex alignItems="center" mb={5}>
              <Avatar src={data?.user?.avatar!} mr={2} />
              <Text>@{data?.user?.username}</Text>
            </Flex>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              autoplay={true}
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
                  <img src={story.image_url} alt={story.filename} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
      </Container>
    </Flex>
  );
};
