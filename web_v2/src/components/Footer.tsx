import { ReactNode } from 'react';
import NextLink from 'next/link';
import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { Logo } from './Logo';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={'blackAlpha.100'}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target="_black"
      referrerPolicy="no-referrer"
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: 'blackAlpha.200',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export function Footer() {
  return (
    <Box marginTop="auto" bg={'gray.900'} color={'gray.200'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Flex alignItems="center">
          <Logo />
          <Text
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="2xl"
            ml="1"
            fontWeight="bold"
          >
            Storiess
          </Text>
        </Flex>
        <Stack direction={'row'} wrap={['wrap']} spacing={[2, 6]} color="gray">
          <Link as={NextLink} href="/">
            Home
          </Link>
          <Link as={NextLink} href="/product">
            Product
          </Link>
          <Link as={NextLink} href="/contact">
            Contact
          </Link>
          <Link as={NextLink} href="/contact">
            Report a bug / issue
          </Link>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor={'gray.700'}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>
            © {new Date().getFullYear()} Storiess. All rights reserved
          </Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton
              label={'Twitter'}
              href={'https://twitter.com/BineetN'}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={'GitHub'}
              href={'https://github.com/bineetNaidu'}
            >
              <FaGithub />
            </SocialButton>
            <SocialButton
              label={'Instagram'}
              href={'https://instagram.com/bineet_naidu'}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
