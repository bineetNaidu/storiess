import { FC, MutableRefObject } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import { Formik, Form } from 'formik';
import { useUpdateUserMutation, Maybe } from 'src/generated/graphql';

interface Props {
  drawerRef: MutableRefObject<any>;
  isOpen: boolean;
  onClose: () => void;
  initialValue: Maybe<string> | undefined;
}

export const UpdateProfileDrawer: FC<Props> = ({
  drawerRef,
  isOpen,
  onClose,
  initialValue,
}) => {
  const toast = useToast();
  const [updateUser] = useUpdateUserMutation();
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={drawerRef}
      onClose={onClose}
    >
      <DrawerOverlay />
      <Formik
        initialValues={{ bio: initialValue || '' }}
        onSubmit={async (value) => {
          updateUser({
            variables: value,
            update: (cache, data) => {
              cache.evict({ id: 'User:' + data.data?.updateUser._id });
            },
          });
          toast({
            title: 'Updated!',
            description: 'You Have successfully update your bio',
            duration: 5000,
            isClosable: true,
            status: 'info',
          });
          onClose();
        }}
      >
        {({ isSubmitting, getFieldProps }) => (
          <Form>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Update Profile
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <Textarea id="bio" autoFocus {...getFieldProps('bio')} />
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};
