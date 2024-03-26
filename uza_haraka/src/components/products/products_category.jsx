import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VStack, Heading, Text, Button, Card } from '@chakra-ui/react'; // Assuming you're using Chakra UI
import axios from 'axios'; // Import axios

const ProductCategory = ({ addToCart }) => {
  const { categoryId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    axios.get(`/product/view-a-category/?id=${categoryId}`)
      .then(response => {
        setCategoryProducts(response.data.products_set); // Assuming products are under 'products_set' key in response
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [categoryId]); // Fetch products when categoryId changes

  return (
    <VStack spacing={4}>
      {categoryProducts.map(product => (
        <Card key={product.id} bg="gray.200" shadow="md" p={4} maxW="md">
          <img src={product.image} alt={product.name} />
          <Heading as="h3" size="md" mt={2}>
            {product.name}
          </Heading>
          <Text>${product.selling_price}</Text>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </Card>
      ))}
    </VStack>
  );
};

export default ProductCategory;
