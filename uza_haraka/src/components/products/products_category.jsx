// ProductCategory.jsx
import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import { Card, VStack, Button, Heading, Text } from '@chakra-ui/react'; // Assuming you're using Chakra UI for styling

const ProductCategory = ({ products, addToCart }) => {
  const { categoryId } = useParams();

  // Filter products based on categoryId
  const categoryProducts = products.filter(product => product.categoryId === categoryId);

  return (
    <VStack spacing={4}>
      {categoryProducts.map(product => (
        <Card key={product.id} bg="gray.200" shadow="md" p={4} maxW="md">
          <img src={product.image} alt={product.name} />
          <Heading as="h3" size="md" mt={2}>
            {product.name}
          </Heading>
          <Text>${product.price}</Text>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </Card>
      ))}
    </VStack>
  );
};

export default ProductCategory;