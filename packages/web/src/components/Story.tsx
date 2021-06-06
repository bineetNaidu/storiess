import { FC } from 'react';
import { User } from '../generated/graphql';
import { Avatar, WrapItem } from '@chakra-ui/react';

interface Props {
  user: User;
}

export const Story: FC<Props> = ({ user }) => {
  return (
    <WrapItem
      role="group"
      border="2px"
      p={0.5}
      borderColor="linear(to-r, red.500, yellow.500)"
      borderRadius="full"
      cursor="pointer"
      boxShadow="md"
    >
      <Avatar
        _groupHover={{ transform: 'scale(1.2)' }}
        name={user.username}
        src={user.avatar!}
        transition="all"
      />
    </WrapItem>
  );
};
