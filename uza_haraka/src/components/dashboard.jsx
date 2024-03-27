import React, { useState, useEffect } from 'react';
import NavBar from './navbar';
import SideBar from './sidebar';
import FooterView from './footer';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  useToast
} from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import { useToasts } from 'react-toast-notifications';

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8000/product/view-category/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '2XORN895V8mX8oUPuZDB1Qhz3PoELUVC',
            'Cookie': 'csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchCategories();
  }, []);

  async function fetchProducts(categoryId) {
    try {
      const response = await fetch(`http://localhost:8000/product/view-a-category/?id=${categoryId}`, {
        method: 'GET',
        headers: {
          'X-CSRFToken': '2XORN895V8mX8oUPuZDB1Qhz3PoELUVC',
          'Cookie': 'csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products for the category');
      }
      const data = await response.json();
      setProducts(data.product_set);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + (item.selling_price * item.quantity), 0);
    setSubtotal(total);
  }, [cart]);

  const handleConfirmCheckout = async () => {
    try {
      const response = await fetch('http://localhost:8000/product/make-sales/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': '2XORN895V8mX8oUPuZDB1Qhz3PoELUVC',
          'Cookie': 'csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot'
        },
        body: JSON.stringify(cart)
      });
      if (!response.ok) {
        throw new Error('Failed to checkout');
      }
      
    } catch (error) {
      console.error('Error:', error);

    } finally {
      setIsLoading(false); // Reset loading state to false
    }

  };

  const showToast = () => {
    toast({
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
      title: 'Transaction Successful',
      description: 'The transaction has been successful.'
    });
  };

  return (
    <>
      <NavBar />
      <Flex direction="row" justify={'space-between'} w="full" columns={{ sm: 2, md: 4 }} >
        <SideBar />
        <Flex direction={'column'} justify={'center'} alignItems={'center'} >
          <Heading size="lg" mb={4} mt={0}>Product Categories</Heading>
          <Flex direction="row" spacing={4} gap={4} marginTop={0} >
            {categories.map(category => (
              <Button
                key={category.id}
                bgColor={selectedCategory === category.id ? 'blue' : 'teal'}
                textColor="white"
                onClick={() => fetchProducts(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </Flex>
          <Flex align="flex-start" direction="column" margin={10} marginBottom={8}>
            <SimpleGrid
              bg='gray.50'
              columns={{ sm: 2, md: 4 }}
              spacing='8'
              textAlign='center'
              rounded='lg'
              color='dark'
            >
              {products.map(product => (
                <Box key={product.id} boxShadow={'lg'} w={48} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                  <Image src={`http://localhost:8000${product.product_image}`} alt={product.name} />
                  <Box mt={4}>
                    <Heading as="h3" size="md">
                      {product.name}
                    </Heading>
                    <Text>KSh.{product.selling_price}</Text>
                    <Button mt={2} colorScheme="blue" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
        <div className="flex flex-col w-72 h-72 overflow-y-scroll gap-4 md:order-1 mr-4 shadow-md rounded-xl p-4">
          <Heading fontSize={22}>ORDER LIST</Heading>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>KSh.{item.selling_price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Text fontWeight={'bold'}>Total: KSh.{subtotal}</Text>
          <div className='center'><Button colorScheme="blue" onClick={onOpen}>Confirm Checkout</Button></div>
        </div>
        <Modal isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Checkout</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg">Total Amount: KSh.{subtotal}</Text>
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Spinner size="md" color="blue.500" />
              ) : (
                <>
                  <Button colorScheme="whatsapp" mr={3} onClick={handleConfirmCheckout}>
                    Pay with MPESA
                  </Button>
                  <Button colorScheme="whatsapp" onClick={() => { onClose(); showToast(); }}>
                    Pay Cash
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <FooterView />
    </>
  );
}
