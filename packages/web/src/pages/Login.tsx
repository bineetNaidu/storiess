import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Button,
  Center,
} from '@chakra-ui/react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useHistory } from 'react-router';
import { useStore } from 'src/lib/store';
import { useLoginMutation } from '../generated/graphql';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const history = useHistory();
  const setUserId = useStore((state) => state.setUserId);
  const [login] = useLoginMutation();
  const toast = useToast();
  const responseGoogle = async (res: GoogleLoginResponse) => {
    const { data } = await login({
      variables: {
        input: {
          avatar: res.profileObj.imageUrl,
          email: res.profileObj.email,
          googleId: res.googleId,
          username: res.profileObj.name.replace(' ', '_'),
        },
      },
    });

    if (data?.login) {
      toast({
        title: 'Successfully Logged you in',
        description: `Welcome ${data.login.username}`,
        status: 'success',
        duration: 1000,
        isClosable: true,
        onCloseComplete: () => {
          setUserId(data.login._id);
          history.push('/');
        },
      });
    }
  };

  const errorResponse = (res: GoogleLoginResponseOffline) => {
    alert(res.code);
  };

  return (
    <Flex
      // minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY!}
              onSuccess={responseGoogle as any}
              onFailure={errorResponse}
              isSignedIn={true}
              render={(props) => (
                <Center p={8}>
                  <Button
                    w={'full'}
                    maxW={'md'}
                    variant={'outline'}
                    leftIcon={<FcGoogle />}
                    onClick={props.onClick}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Center>
              )}
            />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
