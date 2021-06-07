import { FC } from 'react';
import { AddIcon, BellIcon, ChatIcon } from '@chakra-ui/icons';
import { AddStoryModal } from './AddStoryModal';
import { Input, Flex, IconButton, Box, useDisclosure } from '@chakra-ui/react';
import { MeQuery } from '../generated/graphql';

interface Props {
  meData: MeQuery | undefined;
}

export const Header: FC<Props> = ({ meData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex mb={5} justifyContent="center" alignItems="center">
      <AddStoryModal isOpen={isOpen} onClose={onClose} />
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
          disabled={!!meData?.me}
          bgGradient="linear(to-r, red.500, yellow.500)"
          onClick={onOpen}
        >
          <Flex alignItems="center">
            <AddIcon mr={1} /> Add Photo
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
