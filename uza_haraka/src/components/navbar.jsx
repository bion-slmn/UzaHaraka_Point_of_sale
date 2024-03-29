import { Input, Button } from '@chakra-ui/react';
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import { useEffect, useState } from 'react';


function NavBar() {
  const [user, setUser] = useState({
    name: '',
    avatar: ''
  })
  useEffect(() => {
    const ourUser = {
      name: 'username',
    avatar: 'profilePicture',
    }
   console.log(user);
    setUser(ourUser);
  }, [])
  return (
    <Navbar fluid rounded className=' bg-teal-100 h-20 mb-4 shadow-lg p-4 justify-between' >
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-green-500 text-xl text-teal font-extrabold dark:text-green-500">UzaHaraka</span>
      </Navbar.Brand>
      <div className='flex flex-row'>
        <Input type="text" width={80} placeholder='Search Products'   />
        <Button bgColor='teal' textColor={'white'}>Search</Button>
      </div>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className='w-10 h-10 rounded-full' />
          }
        >
          <Dropdown.Item>{user.name}</Dropdown.Item>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={'a'} href='/'>Sign out</Dropdown.Item>
        </Dropdown>
        <DarkThemeToggle className='ml-3' />
      </div>
      
    </Navbar>
  );
}
export default NavBar;