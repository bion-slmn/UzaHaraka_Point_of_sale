import { Avatar, Dropdown, Navbar } from 'flowbite-react';

function NavBar() {
  return (
    <Navbar fluid rounded className='bg-teal-400 shadow-lg mb-4 w-full'>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">UzaHaraka</span>
      </Navbar.Brand>
      <input type="text" className="rounded-8" placeholder='Search Products' />
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      
    </Navbar>
  );
}
export default NavBar;