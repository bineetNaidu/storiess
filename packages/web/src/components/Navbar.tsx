import { Flex, Text } from '@chakra-ui/layout';

export const Navbar = () => {
  return (
    <nav>
      <Flex w="full" justifyContent="center" alignItems="center">
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Stories
        </Text>
      </Flex>
    </nav>
  );
};
