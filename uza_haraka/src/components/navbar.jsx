import { Input } from '@chakra-ui/react';
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';

function NavBar() {
  return (
    <Navbar fluid rounded className='bg-teal shadow-lg mb-4 w-full h-18 p-4' >
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl text-teal font-semibold dark:text-teal">UzaHaraka</span>
      </Navbar.Brand>
      <Input type="text" width={80} placeholder='Search Products' />
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          bgColor={''}
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className='rounded-full' />
          }
        >
          
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={'a'} href='/'>Sign out</Dropdown.Item>
        </Dropdown>
        <DarkThemeToggle />
      </div>
      
    </Navbar>
  );
}
export default NavBar;