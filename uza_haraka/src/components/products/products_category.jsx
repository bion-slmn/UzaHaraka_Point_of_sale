// ProductCategory.jsx
import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import { Card, VStack, Button, Heading, Text } from '@chakra-ui/react'; // Assuming you're using Chakra UI for styling

const ProductCategory = ({ products, addToCart }) => {
  const { categoryId } = useParams();

  // Filter products based on categoryId
  const categoryProducts = products.filter(products => products.categoryId === categoryId);

  return (
    <VStack spacing={4}>
      {categoryProducts.map(product_set => (
        <Card key={product_set.id} bg="gray.200" shadow="md" p={4} maxW="md">
          <img src={product_set.image} alt={product_set.name} />
          <Heading as="h3" size="md" mt={2}>
            {product_set.name}
          </Heading>
          <Text>${product_set.selling_price}</Text>
          <Button onClick={() => addToCart(product_set)}>Add to Cart</Button>
        </Card>
      ))}
    </VStack>
  );
};

export default ProductCategory;