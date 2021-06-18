import { Box, Icon } from '@chakra-ui/react';
import { FcLike } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface Props {
  onClose: () => void;
}

export const LikeAnimation: FC<Props> = ({ onClose }) => {
  return (
    <Box
      position="absolute"
      top={'50%'}
      left={'50%'}
      transform="translate(-50%,-50%)"
      as={motion.div}
      initial={{ scale: 0 }}
      animate={{
        scale: [0, 5, 0],
        transition: { delay: 0.2, duration: 0.7, ease: 'circOut' },
      }}
      onAnimationComplete={() => {
        onClose();
      }}
    >
      <Icon as={FcLike} />
    </Box>
  );
};
