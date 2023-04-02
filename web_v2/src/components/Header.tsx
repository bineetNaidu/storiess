import { AddIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import request from 'graphql-request';
import { FC } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { AddStoryModal } from './AddStoryModal';
import { SearchForm } from './SearchForm';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../lib/gql_generated';
import { StoriesQuery } from '../lib/gql_generated/graphql';

const MeQuery = graphql(`
  query Me {
    me {
      ...BaseUser
    }
  }
`);
const LogoutMutation = graphql(`
  mutation Logout {
    logout
  }
`);

type Props = {
  refetchStories: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<StoriesQuery, unknown>>;
};

export const Header: FC<Props> = ({ refetchStories }) => {
  const { data: meData, isLoading: isMeDataLoading } = useQuery(
    ['me'],
    async () => request('http://localhost:4000/graphql', MeQuery)
  );
  const qClient = useQueryClient();
  const logout = useMutation(['logout'], async () =>
    request('http://localhost:4000/graphql', LogoutMutation)
  );
  const {
    isOpen: isAddStoryModalOpen,
    onOpen: onAddStoryModalopen,
    onClose: onAddStoryModalclose,
  } = useDisclosure();

  const handleLogout = async () => {
    await logout.mutateAsync();
    await refetchStories();
    qClient.clear();
  };

  return (
    <Flex mb={5} justifyContent="center" alignItems="center">
      <AddStoryModal
        isOpen={isAddStoryModalOpen}
        onClose={onAddStoryModalclose}
        refetchStories={refetchStories}
      />
      <SearchForm />
      <Flex justifyContent="flex-end" alignItems="center" flex={0.6}>
        <IconButton
          aria-label="icon button"
          isLoading={isMeDataLoading}
          rounded="full"
        >
          <Avatar name={'Bineet'} src={'https://gravatar.com/000000'} />
        </IconButton>
        <IconButton
          aria-label="icon button"
          mx={2}
          onClick={handleLogout}
          isLoading={logout.isLoading}
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
          onClick={onAddStoryModalopen}
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
