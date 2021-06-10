import { FC } from 'react';
import { BaseStoryFragment } from '../generated/graphql';
import { Avatar, WrapItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  story: BaseStoryFragment & { isWatched?: boolean };
}

export const Story: FC<Props> = ({ story }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.4 } }}
    >
      <WrapItem
        as={Link}
        to={`/stories/${story._id}`}
        role="group"
        p={0.5}
        className={story.isWatched ? undefined : 'awesome-border'}
        borderRadius="full"
        cursor="pointer"
        boxShadow="md"
        opacity={story.isWatched ? 0.4 : 1}
      >
        <Avatar
          _groupHover={{ transform: 'scale(1.15)' }}
          name={story.user._id}
          src={story.user.avatar}
          transition="all"
        />
      </WrapItem>
    </motion.div>
  );
};
