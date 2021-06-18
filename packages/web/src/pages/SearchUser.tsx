import { Container, Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const SearchUser = () => {
  const { q } = useParams<{ q: string }>();
  return (
    <Container>
      <Box>
        <Text>Your Search Result</Text>
        <p>{JSON.stringify(q, null, 2)}</p>
      </Box>
    </Container>
  );
};
