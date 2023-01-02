import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Logo } from './Logo';

export const Navbar: FC = () => {
  return (
    <Flex w="full" justifyContent="center" alignItems="center" as="nav">
      <Text
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Storiess
      </Text>
    </Flex>
  );
};
