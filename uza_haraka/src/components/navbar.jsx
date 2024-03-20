import {
    Avatar,
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
  import { useNavigate, useParams } from 'react-router-dom';
  
  function NavBar() {
    let navigate=useNavigate()
    let { username } = useParams()
    return (
      <Navbar fluid rounded color="blue" className="bg-teal-400 shadow-l" >
        <NavbarBrand href="/">
          <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl text-teal-400 font-semibold dark:text-teal-400">UzaHaraka</span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
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
          
        </div>
       
      </Navbar>
    );
  }
  export default NavBar