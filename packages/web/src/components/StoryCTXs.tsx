import { FC } from 'react';
import { Box, IconButton, Text, Tooltip, useToast } from '@chakra-ui/react';
import { Icon, DeleteIcon, ViewIcon, WarningIcon } from '@chakra-ui/icons';
import { FcLike } from 'react-icons/fc';
import { HiShare } from 'react-icons/hi';
import {
  BaseUserFragment,
  BaseStoryFragment,
  useRemoveStoryMutation,
  useRemoveLikeMutation,
  useReportStoryMutation,
} from '../generated/graphql';
import { useNavigate } from 'react-router';

interface Props {
  me?: BaseUserFragment | null | undefined;
  story: BaseStoryFragment;
}

export const StoryCTXs: FC<Props> = ({ me, story }) => {
  const toast = useToast();
  const [removeLike] = useRemoveLikeMutation();
  const [removeStory] = useRemoveStoryMutation();
  const [reportStory] = useReportStoryMutation();
  const navigate = useNavigate();

  const isSameUser = me && me._id === story.user?._id;

  return (
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
                cache.evict({ id: 'Story:' + story._id });
              },
            });
          } catch (e: Error | unknown | any) {
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
      {!isSameUser ? (
        <Tooltip hasArrow label="Click Report User" bg="blue.200">
          <IconButton
            aria-label="report user button"
            icon={<WarningIcon />}
            onClick={async () => {
              const { data: reportData } = await reportStory({
                variables: { storyId: story._id },
              });
              if (reportData?.reportStory !== null) {
                toast({
                  title: 'Reported',
                  description: `You Have successfully reported against this story`,
                  isClosable: true,
                  duration: 5000,
                  status: 'info',
                });
              }
            }}
          />
        </Tooltip>
      ) : null}
      {isSameUser ? (
        <>
          <IconButton
            p={2}
            mx={1}
            aria-label="bookmark"
            icon={
              <>
                <ViewIcon />
                <Text ml={1}>{story.watched.length}</Text>
              </>
            }
          />
          <IconButton
            p={2}
            mx={1}
            aria-label="Edit Story button"
            onClick={async () => {
              await removeStory({
                variables: { storyId: story._id },
                update: (cache) => {
                  cache.evict({ id: 'Story:' + story._id });
                  navigate('/');
                },
              });
            }}
            icon={<DeleteIcon />}
          />
        </>
      ) : null}
    </Box>
  );
};
