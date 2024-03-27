
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag, HiTable, HiViewBoards } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let navigate=useNavigate()
  return (
    <Sidebar className='h-128 w-64 bg-teal-500' >
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col items-start gap-4 p-4 justify-center'>
          <Sidebar.Item href="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/sales" icon={HiViewBoards}>
            Sales
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard" icon={HiShoppingBag}>
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