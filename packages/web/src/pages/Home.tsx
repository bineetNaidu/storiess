import { AddIcon, BellIcon, ChatIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  Input,
  Spinner,
  Text,
  Wrap,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useStoriesQuery } from 'src/generated/graphql';
import { Story } from '../components/Story';
import { AddStoryModal } from '../components/AddStoryModal';

export const Home = () => {
  const { data, loading } = useStoriesQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container bgColor="#3c3f51" py={5} rounded="md">
      <AddStoryModal isOpen={isOpen} onClose={onClose} />
      <Flex mb={5} justifyContent="center" alignItems="center">
        <Input variant="outline" placeholder="@username" flex={0.4} />

        <Flex justifyContent="flex-end" alignItems="center" flex={0.6}>
          <IconButton aria-label="icon button">
            <BellIcon />
          </IconButton>
          <IconButton aria-label="icon button" mx={2}>
            <ChatIcon />
          </IconButton>
          <Box
            as="button"
            px={4}
            py={2}
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bgGradient="linear(to-r, red.500, yellow.500)"
            onClick={onOpen}
          >
            <Flex alignItems="center">
              <AddIcon mr={1} /> Add Photo
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold">
        Stories
      </Text>
      {loading ? (
        <Spinner />
      ) : (
        <Wrap mt={4}>
          {data && data.stories.map((u) => <Story key={u._id} user={u} />)}
        </Wrap>
      )}
    </Container>
  );
};
