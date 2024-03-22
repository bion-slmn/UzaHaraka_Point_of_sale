import React from 'react'
import NavBar from './navbar'
import SideBar from './sidebar'
import FooterView from './footer'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Button, Heading, Text } from '@chakra-ui/react'

export default function CheckOut() {
    return ( 
      <>
        <NavBar />
        <div className='flex flex-row justify-between gap-2 w-full'>
          <SideBar />
          <div className="flex flex-col flex-end h-full w-full gap-4 md:order-1">
          {/* <div className="flex flex-col flex-end w-300 md:order-2"> */}
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Product name</TableHeadCell>
                <TableHeadCell>Color</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {'Apple MacBook Pro 17"'}
                  </TableCell>
                  <TableCell>Sliver</TableCell>
                  <TableCell>Laptop</TableCell>
                  <TableCell>$2999</TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Remove
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                  </TableCell>
                  <TableCell>White</TableCell>
                  <TableCell>Laptop PC</TableCell>
                  <TableCell>$1999</TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Remove
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</TableCell>
                  <TableCell>Black</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell>$99</TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Remove
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col h-full gap-4 md:order-1 mr-4 shadow-md rounded-xl p-4">
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
