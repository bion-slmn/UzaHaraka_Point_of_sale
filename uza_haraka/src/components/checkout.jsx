import React, {  useEffect, useState } from 'react';
import { Button, Table, Thead, Tbody, Tr, Th, Td, VStack, Heading, Box, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import FooterView from './footer';
import NavBar from './navbar';
import SideBar from './sidebar';


const Checkout = ({ cart, calculateSubtotal }) => {
  const [navigate] = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedCart, setUpdatedCart] = useState(cart);
  

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setUpdatedCart(updatedCart);
  };


  const handleConfirmCheckout = () => {
    // Logic for confirming checkout and storing transaction details
    // Redirect to dashboard after payment confirmation
    onClose(); // Close modal
    navigate('/dashboard'); // Redirect to dashboard
  };
useEffect(() => {
  console.log(updatedCart);
}, [updatedCart]);

  return (
    <>
      <NavBar />
      <Flex direction="row" justify="space-between" w="full">
        <SideBar />
        <VStack spacing={4} align="stretch">
          {/* Table to display products */}
          <Table hoverable variant="simple">
            <Thead>
              <Tr>
                <Th>Product Name</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
            {updatedCart.map((product, index) => (
                <Tr key={index}>
                  <Td>{product.name}</Td>
                  <Td>${product.price}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleRemoveFromCart(product.id)}>Remove</Button>
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td colSpan={2}>Total:</Td>
                <Td>${calculateSubtotal()}</Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Card showing total amount */}
          <Box p={4} shadow="md" rounded="xl" bg="whatsapp.500" color="white">
            <Heading fontSize="lg">Total Amount</Heading>
            <Text fontSize="2xl">${calculateSubtotal()}</Text>
          </Box>

          {/* Confirm Checkout Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Checkout</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Text fontSize="lg">Total Amount: ${calculateSubtotal()}</Text> */}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="whatsapp" mr={3} onClick={handleConfirmCheckout}>
                  Pay with MPESA
                </Button>
                <Button colorScheme="whatsapp" onClick={handleConfirmCheckout}>
                  Pay Cash
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Button to open Confirm Checkout Modal */}
          <Button colorScheme="blue" onClick={onOpen}>Confirm Checkout</Button>
        </VStack>
        <FooterView />
        </Flex>
      </>
    );
}
export default Checkout;