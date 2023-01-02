import { useRef } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Container,
  Box,
  Flex,
  Avatar,
  Spinner,
  Text,
  IconButton,
  Tooltip,
  useToast,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import {
  useMeQuery,
  useReportUserMutation,
  useUserQuery,
} from 'src/generated/graphql';
import { useParams } from 'react-router';
import { WarningIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { UpdateProfileDrawer } from '../components/UpdateProfileDrawer';

export const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerRef = useRef<any>();
  const toast = useToast();
  const { userId } = useParams<{ userId: string }>();
  const { loading, data } = useUserQuery({
    variables: { id: userId ?? '' },
  });
  const [reportUser] = useReportUserMutation();
  const { data: meData } = useMeQuery();

  return (
    <Container bgColor="#3c3f51" py={5} rounded="md">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>user</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} to={`/u/${data?.user?._id}`}>
            {data?.user?.username}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Divider my={5} />

      {loading ? (
        <Spinner />
      ) : (
        <Box>
          {!data?.user ? (
            <Text>No Data Found For this User!</Text>
          ) : (
            <>
              <Flex flexDirection={['column', 'row']} alignItems={['center']}>
                <Avatar
                  size="lg"
                  src={data.user.avatar!}
                  name={data.user.username}
                />
                <Divider mx={5} h="max-content" orientation="vertical" />

                <Box>
                  <Flex
                    alignItems="center"
                    mb={3}
                    flexDirection={['column', 'row']}
                  >
                    <Text mr={4}>@{data.user.username}</Text>
                    {meData?.me?._id !== data.user._id ? (
                      <Tooltip hasArrow label="Click Report User" bg="blue.200">
                        <IconButton
                          size="xs"
                          aria-label="report user button"
                          icon={<WarningIcon />}
                          onClick={async () => {
                            if (data.user) {
                              const { data: reportData } = await reportUser({
                                variables: { userId: data.user._id! },
                              });
                              if (reportData?.reportUser !== null) {
                                toast({
                                  title: 'Reported',
                                  description: `You Have successfully reported against ${data.user.username}`,
                                  isClosable: true,
                                  duration: 5000,
                                  status: 'info',
                                });
                              }
                            }
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <>
                        <Button colorScheme="teal" onClick={onOpen} size="xs">
                          Update Profile
                        </Button>
                        <UpdateProfileDrawer
                          onClose={onClose}
                          drawerRef={drawerRef}
                          isOpen={isOpen}
                          initialValue={data.user.bio}
                        />
                      </>
                    )}
                  </Flex>
                  {data.user.bio ? (
                    <Text mt={1} color="gray.300">
                      {data.user.bio}
                    </Text>
                  ) : (
                    <Text mt={1} color="gray" fontStyle="italic">
                      {data.user.username} haven't setup their bio yet!
                    </Text>
                  )}
                </Box>
              </Flex>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};
