import React, { useState } from 'react'
import NavBar from './navbar'
import SideBar from './sidebar'
import FooterView from './footer'
import { Button, Card, CardBody, Heading, Link, Switch, Text, VStack } from '@chakra-ui/react'
// import CheckOut from './checkout'
// import ListProducts from './products/products_list'
import { useEffect } from 'react'
import { Route, Router, Routes, useParams } from 'react-router-dom'
import ProductCategory from './products/products_category'

// Function to get CSRF token from cookies
// function getCookie(name) {
//   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//   return cookieValue ? cookieValue.pop() : '';
// }

function getCookie(name) {
  let cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

        break;
      }
    }
  }
  return cookieValue;
}



export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Define cart state here

  const csrftoken = getCookie('csrftoken');
  const sessionid = getCookie('sessionid');

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  // console.log(csrftoken, sessionid);
  useEffect(() => {
    // Function to fetch product categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/product/view-category/', {
          method: 'GET',
          headers: {
            'Content-Type': 'applview-category',
            'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token from cookie
            'Cookie': 'sessionid=' + getCookie('sessionid') + ';csrftoken=' + getCookie('csrftoken')
          },
          // credentials: 'include', // Include cookies in the request

        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data); // Set categories state with fetched data
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    console.log(123,categoryId)

    try {
      const response = await fetch(`http://localhost:8000/product/view-a-category/?id=${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token from cookie
          'Cookie': 'sessionid=' + getCookie('sessionid') + ';csrftoken=' + getCookie('csrftoken')
        },
        
      });
      

      if (!response.ok) {
        throw new Error('Failed to fetch products for the category');
      }

      const responseData = await response.json(); // Extract JSON data from response
      console.log(responseData.products_set); // Access the data from the response
      setProducts(responseData.products_set); // Set products state with fetched data

      // Handle the response to show the products in the category
    } catch (error) {
      console.error('Error fetching products for the category:', error);
      // Handle error
    }
    
  };

  // Empty dependency array ensures the effect runs only once on component mount
  // console.log(products);
  // Extracting categoryId from the URL path
  const { categoryId } = useParams();

  return (
    <>
      <NavBar />
      <div className='flex flex-row justify-between  w-full'>
        <SideBar />
        <VStack>
          {/* Render categories */}
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`} onClick={() => handleCategoryClick(category.id)}>
              <Card maxW="md" p={4} shadow="md" mb={4}>
                <Heading as="h1" fontSize="30px" letterSpacing="-0.5px" color="#2da44e" fontWeight="bold">
                  {category.name}
                </Heading>
              </Card>
            </Link>
          ))}
          {/* Render error message if fetching categories failed */}
          {error && <p>{error}</p>}
        </VStack>
        <Routes>
          {/* Route to display products in a category */}
          <Route path="/category/:categoryId" element={<ProductCategory products={products} addToCart={addToCart} />} />
        </Routes>
        <div className="flex flex-col h-full gap-4 md:order-1 mr-4 shadow-md rounded-xl p-4">
          <Heading fontSize={22}>ORDER LIST</Heading>
          {/* Render items in the cart */}
          {cart.map((product, index) => (
            <div key={index}>
              <Text>{product.name}</Text>
              <Text>${product.price}</Text>
            </div>
          ))}
          <Text>Subtotal: ${calculateSubtotal()}</Text>
          <Button as={'a'} href='/checkout' bgColor={'blue'} textColor={'white'}>Checkout</Button>
        </div>
      </div>
      <FooterView />
    </>
  );
}
