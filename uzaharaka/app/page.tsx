import { Flex, Heading, Input, Button, useColorMode } from "@chakra-ui/react";


const IndexPage = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Flex height={"100vh"} alignItems={'center'} justifyContent={'center'}>
      <Flex direction={'column'} background={'gray.100'} p={12} rounded={6}>
        <Heading mb={6}>Sign In</Heading>
        <Input placeholder='Your username' variant='filled' mb={3} type='email' />
        <Input placeholder='********' variant='filled' mb={6} type='password' />
        <Button colorScheme='facebook'>Log in</Button>
        <Button onClick={toggleColorMode}>Toggle color mode</Button>
      </Flex>
    </Flex>
    
  );
}

export default IndexPage
