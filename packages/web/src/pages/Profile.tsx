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
} from '@chakra-ui/react';
import { useUserQuery } from 'src/generated/graphql';
import { useParams } from 'react-router';

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { loading, data } = useUserQuery({
    variables: { id: userId },
  });

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
                  <Text>@{data.user.username}</Text>
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
