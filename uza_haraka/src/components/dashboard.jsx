import React from 'react'
import NavBar from './navbar'
import SideBar from './sidebar'
import FooterView from './footer'
import { Button } from '@chakra-ui/react'

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className='flex flex-row'>
        <SideBar />
        <div className="flex align-center gap-4 md:order-2">
            <Button className='ml-8'>All Products</Button>
            <Button>Kitchenware</Button>
            <Button>Beverages</Button>
            <Button>Foodstuffs</Button>
            <Button>Toiletries</Button>
          </div>
        
      </div>
      
      <FooterView />
    </>
  )
}
