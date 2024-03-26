import React from 'react'
import NavBar from './navbar'
import SideBar from './sidebar'
import FooterView from './footer'

import { Box, Button, Flex, Heading, Image, Text, SimpleGrid } from '@chakra-ui/react'

import { useEffect } from 'react'
import { useState } from 'react'



export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Function to fetch categories
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

  // Function to fetch products based on category
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
      setSelectedCategory(categoryId); // Set the selected category
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, product) => total + product.selling_price, 0);
  };


  return (
    <>
      <NavBar />
      <Flex direction="row" justify={'space-between'} w="full" columns={{ sm: 2, md: 4 }} >
        <SideBar />
        <Flex direction={'column'} justify={'center'} alignItems={'center'} >
          {/* <Grid templateColumns="1fr 3fr 1fr" gap={8} p={4}> */}
          {/* Categories */}

          <Flex direction="row" spacing={4} gap={4} marginTop={0} >
            <Heading size="md">Product Categories</Heading>
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
          {/* Products */}
          <Flex align="flex-start" direction="column" marginLeft={10} marginRight={10}>
            {/* <Heading size="md">Products</Heading> */}
            <SimpleGrid
              bg='gray.50'
              columns={{ sm: 2, md: 4 }}
              spacing='8'
              p='10'
              textAlign='center'
              rounded='lg'
              color='dark'
            >
              {products.map(product => (
                <Box key={product.id} boxShadow={'lg'} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                  <Image src={`http://localhost:8000${product.product_image}`} alt={product.name} />
                  <Box mt={4}>
                    <Heading as="h3" size="md">
                      {product.name}
                    </Heading>
                    <Text>${product.selling_price}</Text>
                    <Button mt={2} colorScheme="blue" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Flex>

        </Flex>

        <div className="flex flex-col h-72 overflow-y-scroll gap-4 md:order-1 mr-4 shadow-md rounded-xl p-4">
          <Heading fontSize={22}>ORDER LIST</Heading>
          <div>
            <Button as={'a'} href='/checkout' bgColor={'blue'} textColor={'white'}>Checkout</Button>
          </div>
          <Text>Subtotal: ${calculateSubtotal()}</Text>
          {cart.map((product, index) => (
            <div key={index}>
              <Text>{product.name}</Text>
              <Text>${product.selling_price}</Text>
            </div>
          ))}
        </div>
      </Flex>
      < FooterView />
    </>
  );
}
