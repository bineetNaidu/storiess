import { Box, Text, Flex, useToast } from '@chakra-ui/react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useLoginMutation } from '../generated/graphql';

const Login = () => {
  const [login] = useLoginMutation();
  const toast = useToast();
  const responseGoogle = async (res: GoogleLoginResponse) => {
    try {
      await login({
        variables: {
          input: {
            email: res.profileObj.email,
            googleId: res.googleId,
            username: res.profileObj.name,
          },
        },
      });
    } catch (e) {
      // alert(e.message);
      if (
        e.message.includes(
          'E11000 duplicate key error collection: stories.users index: email_1 dup key:'
        )
      ) {
        toast({
          title: 'Error on Logging you in.',
          description: 'Email is already in use.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const errorResponse = (res: GoogleLoginResponseOffline) => {
    alert(res.code);
  };
  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Box mt="5" textAlign="center">
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Get started with Stories
        </Text>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY!}
          onSuccess={responseGoogle as any}
          onFailure={errorResponse}
        >
          <Box
            as="button"
            p={4}
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bgGradient="linear(to-r, teal.500,green.500)"
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
          >
            Login With Google
          </Box>
        </GoogleLogin>
      </Box>
    </Flex>
  );
};

export default Login;
