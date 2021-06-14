import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  OrderedList,
  ListItem,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewToSiteModal: FC<Props> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    localStorage.setItem('stories:nts', 'false');
    onClose();
  };
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={['3xl']} color="Highlight">
          Welcome to Stories! 👋👋
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="1rem">
          <Text fontWeight="extrabold" mb={2} color="blanchedalmond">
            Take a step back 🛑 Read this 👇.
          </Text>
          <Text>
            We don't want you hang you in here for more than a minute. Just{' '}
            <b>ABIDE</b> by the guidelines.
          </Text>
          <Box mt={2}>
            <Text fontWeight="extrabold" color="blue.500" fontSize="xl">
              Guidelines 😤
            </Text>
            <OrderedList px={2}>
              <ListItem>
                No <b>Abusing</b> of Users
              </ListItem>
              <ListItem>
                No <b>inappropiate story</b>, We strongly urge the users to
                report those "stories" / "users", we'll take actions on them
              </ListItem>
              <ListItem>And Just have FUN!! ✌️✌️</ListItem>
            </OrderedList>
          </Box>
          <Box mt={2}>
            <Text fontWeight="extrabold" color="blue.500" fontSize="xl">
              Featues 😃
            </Text>
            <OrderedList px={2}>
              <ListItem>Add Stories (limit 5 story a a time 😐)</ListItem>
              <ListItem>Like a Story</ListItem>
              <ListItem>See Your view on your story</ListItem>
              <ListItem>Share your story</ListItem>
            </OrderedList>
          </Box>
          <Text mt={3} fontStyle="italic" color="yellowgreen">
            Feel free to contact for any thing related to "Stories". Mail me:{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:bineetnaiduapps@gmail.com"
            >
              bineetnaiduapps@gmail.com
            </a>{' '}
            OR visit{' '}
            <Link to="/contact">
              <Text fontWeight="bold" color="green.600">
                /contact
              </Text>
            </Link>
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
