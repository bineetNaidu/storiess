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
import { useMeQuery } from 'src/generated/graphql';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStoryModal: FC<Props> = ({ isOpen, onClose }) => {
  const { data: meData, loading } = useMeQuery();
  const toast = useToast();
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
                if (!loading && meData?.me) {
                  const file = files[0];
                  const url = 'http://localhost:4000/api/story';
                  const formData = new FormData();
                  formData.append('enctype', 'multipart/form-data');
                  formData.append('image', file);
                  formData.append('user', meData.me._id);

                  const res = await fetch(url, {
                    method: 'POST',
                    body: formData,
                  });
                  const data = await res.json();
                  if (data.success && data.data !== null) {
                    onClose();
                    toast({
                      title: 'Success',
                      description: 'Story Uploaded!',
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
                  } else {
                    throw new Error(data.error);
                  }
                }
              } catch (e) {
                toast({
                  title: 'Error',
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
