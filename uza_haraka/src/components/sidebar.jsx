
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let navigate=useNavigate()
  return (
    <Sidebar className='bg-teal-400 w-64 h-full' variant="dark">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Sales
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Customers
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item onClick={()=>{navigate('/')}} icon={HiTable}>
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default SideBar