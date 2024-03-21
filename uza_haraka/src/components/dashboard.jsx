import React from 'react'
import NavBar from './navbar'
import SideBar from './sidebar'
import FooterView from './footer'
import { Button, Heading, Text } from '@chakra-ui/react'
import CheckOut from './checkout'

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className='flex flex-row justify-between w-full'>
        <SideBar />
        <div className="flex gap-4 md:order-2">
            <Button className='ml-8'>All Products</Button>
            <Button>Kitchenware</Button>
            <Button>Beverages</Button>
            <Button>Foodstuffs</Button>
            <Button>Toiletries</Button>
          </div>
          <div className="flex flex-col h-full flex-end gap-4 mr-8 md:order-1 shadow-md rounded-xl p-4">
             <Heading>ORDER LIST</Heading>
             <Text>Item1</Text>
             <Text>Item2</Text>
             <Text>Item3</Text>
             <Text>Subtotal</Text>
             <Button as={'a'} href='/checkout' bgColor={'blue'} textColor={'white'}>Checkout</Button>
          </div>
        
      </div>
      
      <FooterView />
    </>
  )
}
