import React, { useState, useEffect } from 'react';
import NavBar from './navbar';
import SideBar from './sidebar';
import { Flex, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

function Sales() {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        async function fetchSales() {
            try {
                const response = await fetch(`http://localhost:8000/product/view-sales/`, {
                    method: 'GET',
                    headers: {
                        'X-CSRFToken': '2XORN895V8mX8oUPuZDB1Qhz3PoELUVC',
                        'Cookie': 'csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch sales');
                }
                const sales = await response.json();
                setSales(sales);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchSales();
    }, []);

    return (
        <>
            <NavBar />
            <Flex direction="row" justify={'space-between'} w="full" columns={{ sm: 2, md: 4 }}>
                <SideBar />
                <Flex direction="column" w="full" p={4}>
                    <Heading mb={4} textAlign={'center'}>Sales History</Heading>
                    <Table variant="striped" colorScheme="gray" size="md">
                        <Thead>
                            <Tr>
                                <Th>Item</Th>
                                <Th>Quantity</Th>
                                <Th>Subtotal</Th>
                                <Th>Date Created</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sales.map((item, index) => (
                                <Tr key={index} _hover={{ bg: "gray.100" }}>
                                    <Td>{item.product_name}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>${item.selling_price * item.quantity}</Td>
                                    <Td>{item.updated_at}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            </Flex>
        </>
    );
}

export default Sales;
