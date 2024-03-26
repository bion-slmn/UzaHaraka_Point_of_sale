import React from 'react'
import NavBar from './navbar'
import SideBar from './sidebar'
import FooterView from './footer'

import { Box, Button, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'

import { useEffect } from 'react'
import { useState } from 'react'



export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-row justify-between w-full'>
        <SideBar />
        <Stack direction="col" spacing={4} p={4}>
          {/* Categories */}
          <VStack align="flex-start" direction={'row'} spacing={4}>
            <Heading size="md">Categories</Heading>
            {categories.map(category => (
              <Button key={category.id} onClick={() => fetchProducts(category.id)}>
                {category.name}
              </Button>
            ))}
          </VStack>

          {/* Products */}
          <VStack align="flex-start" spacing={4}>
            <Heading size="md">Products</Heading>
            {products.map(product => (
              <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} maxW="md">
                <Image src={product.product_image} alt={product.name} />
                <Box mt={4}>
                  <Heading as="h3" size="md">
                    {product.name}
                  </Heading>
                  <Text>${product.selling_price}</Text>
                  <Button mt={2} colorScheme="blue" onClick={()=>addToCart(product)}>
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            ))}
          </VStack>
          <div className="flex flex-col h-full gap-4 md:order-1 mr-4 shadow-md rounded-xl p-4">
            <Heading fontSize={22}>ORDER LIST</Heading>
            {/* Render items in the cart */}
            {cart.map((product, index) => (
              <div key={index}>
                <Text>{product.name}</Text>
                <Text>${product.selling_priceprice}</Text>
              </div>
            ))}
            <Text>Subtotal: ${calculateSubtotal()}</Text>
            <Button as={'a'} href='/checkout' bgColor={'blue'} textColor={'white'}>Checkout</Button>
          </div>
        </Stack >
      </div>
      <FooterView />
  </>
  )
}