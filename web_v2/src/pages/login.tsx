import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import request from 'graphql-request';
import { config } from '../lib/configuration';
import { loginMutationQuery } from '../lib/queries';
import { UserInput } from '../lib/gql_generated/graphql';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const loginMutate = useMutation(async (input: UserInput) =>
    request(config.api_uri, loginMutationQuery, {
      input,
    })
  );

  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      if (access_token) {
        const q = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: 'application/json',
            },
          }
        );

        const data = await q.json();

        const authUser = await loginMutate.mutateAsync({
          avatar: data.picture,
          email: data.email,
          username: data.name,
          googleId: data.id,
        });

        if (authUser.login !== null) {
          router.push('/');
        }
      }
    },
  });

  return (
    <Layout>
      <Flex w="full" alignItems={'center'} justifyContent={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={[0, 6]}>
          <Stack alignItems={'center'}>
            <Heading fontSize={'4xl'} textAlign="center" color={'white'}>
              Sign in to your account
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link>{' '}
              ✌️
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={'gray.700'} boxShadow={'lg'} p={8}>
            <Stack spacing={[2, 4]}>
              <Box>
                {/* GOOGLE AUTH BUTTON */}
                <Center p={[2, 8]}>
                  <Button
                    isLoading={loginMutate.isLoading}
                    w={'full'}
                    maxW={'md'}
                    variant={'outline'}
                    colorScheme={'whiteAlpha'}
                    leftIcon={<FcGoogle />}
                    onClick={() => login()}
                  >
                    <Center>
                      <Text color={'white'}>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Center>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default LoginPage;
