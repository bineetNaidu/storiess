import { Box, Text, Flex, useToast } from '@chakra-ui/react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useHistory } from 'react-router';
import { useStore } from 'src/lib/store';
import { useLoginMutation } from '../generated/graphql';

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
          username: res.profileObj.name.replace(' ', '_').toLowerCase(),
        },
      },
    });

    if (data?.login) {
      toast({
        title: 'Successfully Logged you in',
        description: `Welcome ${data.login.username}`,
        status: 'success',
        duration: 2000,
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
          isSignedIn={true}
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
