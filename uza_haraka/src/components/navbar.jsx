import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    
  } from 'flowbite-react';
  import { FormControl, Flex } from '@chakra-ui/react';
  import { useNavigate, useParams } from 'react-router-dom';
  
  function NavBar() {
    let navigate=useNavigate()
    let { username } = useParams()
    return (
      <Navbar fluid rounded color="blue" className="bg-teal-400 shadow-l" >
        <div className="container flex flex-row justify-space-between items-center">
          <Flex>
            <NavbarBrand href="/">
              <span className="self-center whitespace-nowrap ml-4 text-xl text-teal-400 font-semibold dark:text-teal-400">UzaHaraka</span>
            </NavbarBrand>
            <FormControl className='w-full md:w-auto'>
              <input type="text" placeholder="Search Products" className="border-2 border-gray-400 rounded-xl w-full ml-4 px-4 py-2" />
            </FormControl>
            <Dropdown
                  className='mr-4'
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt="User settings" img="" rounded />
                  }
                >
                  <DropdownHeader>
                    <span className="block text-sm">{username}</span>
                    <span className="block truncate text-sm font-medium">{username}</span>
                  </DropdownHeader>
                  <DropdownItem>Dashboard</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Earnings</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={()=>{navigate('/')}}>Sign out</DropdownItem>
                </Dropdown>
          </Flex>
        </div>
        <div className="flex items-center gap-2 md:order-2">
          <Button>All Products</Button>
          <Button>Kitchenware</Button>
          <Button>Beverages</Button>
          <Button>Foodstuffs</Button>
          <Button>Toiletries</Button>
        </div>
       
      </Navbar>
    );
  }
  export default NavBar