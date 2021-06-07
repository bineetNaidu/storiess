import { FC } from 'react';
import Dropzone from 'react-dropzone';
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useAddStoryMutation } from 'src/generated/graphql';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStoryModal: FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [addStory] = useAddStoryMutation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={5}>
        <ModalHeader>Add your Story 😃</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          border={2}
          borderColor="gray.800"
          borderStyle="dashed"
          mx={5}
        >
          <Dropzone
            onDrop={async (files) => {
              try {
                await addStory({
                  variables: {
                    filename: files[0].name,
                    image_url: files[0].name,
                  },
                });
              } catch (e) {
                toast({
                  title: 'Not Logged In',
                  description: e.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
            accept="image/jpeg, image/png"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
