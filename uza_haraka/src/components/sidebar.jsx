
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag, HiTable, HiViewBoards } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let navigate=useNavigate()
  return (
    <Sidebar className='flex flex-col h-full gap-4' >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Sales
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