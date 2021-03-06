import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AddIcon, Icon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
import { AddStoryModal } from './AddStoryModal';
import { Flex, IconButton, Box, useDisclosure, Text } from '@chakra-ui/react';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import {
  StoriesQuery,
  useLogoutMutation,
  useMeQuery,
} from 'src/generated/graphql';
import { HiOutlineLogout } from 'react-icons/hi';
import { useGoogleLogout } from 'react-google-login';
import { useStore } from '../lib/store';
import { SearchForm } from './SearchForm';

interface Props {
  refetch: () => Promise<ApolloQueryResult<StoriesQuery>>;
}

export const Header: FC<Props> = ({ refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useMeQuery();
  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_KEY!,
  });
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const setUserId = useStore((state) => state.setUserId);
  return (
    <Flex mb={5} justifyContent="center" alignItems="center">
      <AddStoryModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      <SearchForm />
      <Flex justifyContent="flex-end" alignItems="center" flex={0.6}>
        <IconButton
          aria-label="icon button"
          isLoading={loading}
          as={Link}
          rounded="full"
          to={`/u/${data?.me?._id}`}
        >
          <Avatar name={data?.me?.username} src={data?.me?.avatar} />
        </IconButton>
        <IconButton
          aria-label="icon button"
          mx={2}
          isLoading={loading}
          onClick={async () => {
            await logout();
            signOut();
            await apolloClient.resetStore();
            setUserId(null);
          }}
        >
          <Icon as={HiOutlineLogout} />
        </IconButton>
        <Box
          as="button"
          px={[2, 4]}
          py={2}
          color="white"
          fontWeight="bold"
          borderRadius="md"
          bgGradient="linear(to-r, red.500, yellow.500)"
          onClick={onOpen}
        >
          <Flex alignItems="center">
            <AddIcon mr={1} />
            <Text display={['none', 'block']}>Add Photo</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
