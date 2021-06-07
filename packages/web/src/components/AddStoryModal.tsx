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
                const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
                const file = files[0];

                const formData = new FormData();
                formData.append('file', file);
                formData.append(
                  'upload_preset',
                  process.env.REACT_APP_CLOUDINARY_PRESET_ID!
                );

                const res = await fetch(url, {
                  method: 'POST',
                  body: formData,
                });

                const {
                  asset_id,
                  etag,
                  url: image_url,
                  public_id,
                  original_filename,
                } = await res.json();

                await addStory({
                  variables: {
                    input: {
                      assetId: asset_id,
                      etag,
                      image_url,
                      publicId: public_id,
                      filename: original_filename,
                    },
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: 'stories' });
                    onClose();
                  },
                });
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
