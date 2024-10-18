import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaCogs, FaUsers, FaTools, FaSignOutAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useAuth } from '@/auth/authWrapper';
import { Link } from 'react-router-dom';
const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false); 

  const handleItemClick = (item: string) => {
    setSelected(item);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleResize = () => {
    if (window.innerWidth < 870) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    // Set state based on window size
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getHoverClass = () => {
    if (isCollapsed && selected) return ''; 
    return 'hover:bg-[#1A3DA3] hover:opacity-80 hover:text-white'; 
  };

  const getSelectedClass = (item: string) => {
    return window.innerWidth >= 870 && selected === item ? 'bg-[#1A3DA3] text-white' : '';
  };
    const auth = useAuth();
  return (
    <div
      className={`h-screen bg-[#F5F5F5] text-md text-[#808191] flex flex-col justify-between items-center transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-1/6'
      }`}
    >
      
      <button
        className="md:hidden p-2"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </button>

      <ul className="space-y-2 mt-8 px-4 w-full">
        <Link
        to={"/"}
          className={`flex w-full items-center rounded-[10px] cursor-pointer pr-5 pl-5 py-4 transition duration-200 ${getSelectedClass('dashboard')} ${getHoverClass()}`}
          onClick={() => handleItemClick('dashboard')}
        >
          <FaTachometerAlt className="mr-2" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Dashboard</span>
        </Link>
        <Link
        to={"/machines"}
          className={`flex items-center rounded-[10px] cursor-pointer pr-5 pl-5 py-4 transition duration-200 ${getSelectedClass('machines')} ${getHoverClass()}`}
          onClick={() => handleItemClick('machines')}
        >
          <FaTools className="mr-2" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Machines</span>
        </Link>
        <Link
        to={"/workers"}
          className={`flex items-center rounded-[10px] cursor-pointer pr-5 pl-5 py-4 transition duration-200 ${getSelectedClass('workers')} ${getHoverClass()}`}
          onClick={() => handleItemClick('workers')}
        >
          <FaUsers className="mr-2" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Workers</span>
        </Link>
      </ul>

      <ul className="space-y-2 w-full mb-8 px-4">
        <li
          className={`flex items-center rounded-[10px] cursor-pointer pr-5 pl-5 py-4 transition duration-200 ${getSelectedClass('settings')} ${getHoverClass()}`}
          onClick={() => handleItemClick('settings')}
        >
          <FaCogs className="mr-2" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Settings</span>
        </li>
        <li
          className={`flex items-center rounded-[10px] cursor-pointer pr-10 pl-5 py-4 transition duration-200 ${getSelectedClass('logout')} ${getHoverClass()}`}
          onClick={auth.logout}        >
          <FaSignOutAlt className="mr-2" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
