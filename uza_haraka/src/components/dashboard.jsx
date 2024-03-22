import React from 'react'
import NavBar from './navbar'
import SideBar from './sidebar'
import FooterView from './footer'
import { Button, Heading, Text } from '@chakra-ui/react'
import CheckOut from './checkout'
import ListProducts from './products/products_list'

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className='flex flex-row justify-between  w-full'>
        <SideBar />

        <div className="flex flex-col">
          <div className='flex flex-row h-full flex-end gap-6'>
            <Button bgColor={'teal'} color={'white'}>All Products</Button>
            <Button bgColor={'teal'} color={'white'}>Kitchenware</Button>
            <Button bgColor={'teal'} color={'white'}>Beverages</Button>
            <Button bgColor={'teal'} color={'white'}>Foodstuffs</Button>
            <Button bgColor={'teal'} color={'white'}>Toiletries</Button>
          </div>
          <ListProducts />
        </div>
        <div className="flex flex-col h-full gap-4 md:order-1 mr-4 shadow-md rounded-xl p-4">
          <Heading fontSize={22}>ORDER LIST</Heading>
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
