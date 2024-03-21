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
    DarkThemeToggle,
    
  } from 'flowbite-react';
  import { FormControl, Flex, Spacer, Box } from '@chakra-ui/react';
  import { useNavigate, useParams } from 'react-router-dom';
 
  function NavBar() {
    
    let navigate=useNavigate()
    let { username } = useParams()
    return (
      <Navbar className="w-full">
        
        <div className="flex flex-column items-center justify-center">
          <Flex>
            <NavbarBrand href="#">
              <span className=" whitespace-nowrap ml-4 text-xl text-teal-400 font-semibold dark:text-teal-400">UzaHaraka</span>
            </NavbarBrand> 
            <FormControl className=' md:w-auto'>
              <input type="text" placeholder="Search Products" className="border-2 border-gray-400 rounded-xl w-full ml-4 px-4 py-2" />
            </FormControl>
            <Spacer />
            <Dropdown
                  className='justify-flex-end'
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
                <DarkThemeToggle />
          </Flex>
        </div>
      
        
       
      </Navbar>
    );
  }
  export default NavBar