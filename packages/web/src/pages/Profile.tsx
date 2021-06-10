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
} from '@chakra-ui/react';
import { useReportUserMutation, useUserQuery } from 'src/generated/graphql';
import { useParams } from 'react-router';
import { WarningIcon } from '@chakra-ui/icons';

export const Profile = () => {
  const toast = useToast();
  const { userId } = useParams<{ userId: string }>();
  const { loading, data } = useUserQuery({
    variables: { id: userId },
  });
  const [reportUser] = useReportUserMutation();

  return (
    <Container bgColor="#3c3f51" py={5} rounded="md">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">/ dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>user</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/u/${data?.user?._id}`}>
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
              <Flex>
                <Avatar
                  size="lg"
                  src={data.user.avatar!}
                  name={data.user.username}
                />
                <Divider mx={5} h="max-content" orientation="vertical" />

                <Box>
                  <Flex alignItems="center" mb={3}>
                    <Text mr={4}>@{data.user.username}</Text>
                    <Tooltip hasArrow label="Click Report User" bg="blue.200">
                      <IconButton
                        size="xs"
                        aria-label="report user button"
                        icon={<WarningIcon />}
                        onClick={async () => {
                          if (data.user) {
                            await reportUser({
                              variables: { userId: data.user._id! },
                            });
                            toast({
                              title: 'Reported',
                              description: `You Have successfully reported against ${data.user.username}`,
                              isClosable: true,
                              duration: 5000,
                              status: 'info',
                            });
                          }
                        }}
                      />
                    </Tooltip>
                  </Flex>
                  {data.user.bio ? (
                    <Text mt={1}>{data.user.bio}</Text>
                  ) : (
                    <Text mt={1} color="gray" fontStyle="italic">
                      {data.user.username} has setup their bio
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
