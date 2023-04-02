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
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';
import { graphql } from '../lib/gql_generated';
import { StoriesQuery } from '../lib/gql_generated/graphql';
import request from 'graphql-request';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refetchStories: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<StoriesQuery, unknown>>;
};

const meQuery = graphql(`
  query Me {
    me {
      ...BaseUser
    }
  }
`);

export const AddStoryModal: FC<Props> = ({
  isOpen,
  onClose,
  refetchStories,
}) => {
  const { data: meData, isLoading } = useQuery(['me'], async () =>
    request('http://localhost:4000/graphql', meQuery)
  );
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
                files.forEach((file) => {
                  if (file.type !== 'image/jpeg' || 'image/png') {
                    throw Error('The file should an image');
                  }
                });
                if (!isLoading && !!(meData && !meData.me)) {
                  const file = files[0];
                  const url = process.env.REACT_APP_API_STORY_URL!;
                  const formData = new FormData();
                  formData.append('enctype', 'multipart/form-data');
                  formData.append('image', file);
                  formData.append('user', (meData?.me as any)._id as any);

                  const res = await fetch(url, {
                    method: 'POST',
                    body: formData,
                  });
                  const data = await res.json();
                  if (data.success && data.data !== null) {
                    refetchStories();
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
              } catch (e: Error | any | unknown) {
                toast({
                  title: 'Error',
                  description: e.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
            // accept="image/jpeg, image/png"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    Drag &lsquo;n&lsquo; drop some files here, or click to
                    select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
