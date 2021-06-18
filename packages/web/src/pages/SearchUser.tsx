import {
  Container,
  Box,
  Text,
  Divider,
  Spinner,
  Flex,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useSearchUserQuery } from 'src/generated/graphql';

export const SearchUser = () => {
  const { search } = useLocation();
  const { data, loading } = useSearchUserQuery({
    variables: { query: search.replace('?q=', '') },
  });
  return (
    <Container>
      <Box>
        <Text>Your Search Result</Text>
        <Divider />
        <Center>
          {loading ? (
            <Spinner />
          ) : (
            <Box my={4}>
              {data ? (
                data.searchUser.map((u) => (
                  <Flex
                    key={u._id}
                    alignItems="center"
                    bg="blackAlpha.500"
                    px={8}
                    py={3}
                    rounded="md"
                    as={Link}
                    to={`/u/${u._id}`}
                  >
                    <Avatar src={u.avatar} name={u.username} />
                    <Text ml={2}>@{u.username}</Text>
                  </Flex>
                ))
              ) : (
                <Text>Somthing Went Wrong</Text>
              )}
            </Box>
          )}
        </Center>
      </Box>
    </Container>
  );
};
