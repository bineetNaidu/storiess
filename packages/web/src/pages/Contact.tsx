import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
} from '@chakra-ui/react';

export const Contact = () => {
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={'gray.900'}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src="https://avatars.githubusercontent.com/u/66471461?v=4"
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          Bineet Naidu
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @bineet_naidu
        </Text>
        <Text textAlign={'center'} color={'gray.400'} px={3}>
          As the developer and designer of Stories, I handle all of the
          technical details and making sure you have a smooth experience. If you
          run into any bugs or issues send me an email to get it fixed.
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge px={2} py={1} bg={'gray.800'} fontWeight={'400'}>
            #developer
          </Badge>
          <Badge px={2} py={1} bg={'gray.800'} fontWeight={'400'}>
            #stories
          </Badge>
        </Stack>

        <Center mt={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            as="a"
            target="_blank"
            href="mailto:bineetnaiduapps@gmail.com?subject=Feedback/Bug reports from the Stories"
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Send a Email
          </Button>
        </Center>
      </Box>
    </Center>
  );
};
