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
  import { FormControl, Flex } from '@chakra-ui/react';
  import { useNavigate, useParams } from 'react-router-dom';
  import { useSidebarContext } from "@/context/SidebarContext";
  import { isSmallScreen } from "@/helpers/is-small-screen";
  import { HiMenuAlt1, HiX } from "react-icons/hi";
  
  function NavBar() {
    const { isCollapsed: isSidebarCollapsed, setCollapsed: setSidebarCollapsed } =
    useSidebarContext();
    let navigate=useNavigate()
    let { username } = useParams()
    return (
      <Navbar fluid rounded color="blue" className="bg-teal-400 shadow-l" >
        <div className="container flex flex-row justify-space-between items-center">
          <Flex>
            <button
                aria-controls="sidebar"
                aria-expanded
                className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              >
                {isSidebarCollapsed || !isSmallScreen() ? (
                  <HiMenuAlt1 className="h-6 w-6" />
                ) : (
                  <HiX className="h-6 w-6" />
                )}
              </button>
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
        <DarkThemeToggle />
        
       
      </Navbar>
    );
  }
  export default NavBar