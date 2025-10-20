import React from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import dashboardIcon from "../../assets/icons/dashboard.svg";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Blog",
      itemId: "/blog",
      icon: () => <img src={dashboardIcon} alt="icon" />,
      children: true,
      subNav: [
        {
          title: "View",
          itemId: "/view-blog",
          icon: () => <img src={dashboardIcon} alt="icon" />,
        },
        {
          title: "Create",
          itemId: "/create-blog",
          icon: () => <img src={dashboardIcon} alt="icon" />,
        },
      ],
    },
    {
      title: "Admins",
      itemId: "/admins",
      icon: () => <img src={dashboardIcon} alt="icon" />,
      children: true,
      subNav: [
        {
          title: "View",
          itemId: "/view-admins",
          icon: () => <img src={dashboardIcon} alt="icon" />,
        },
        {
          title: "Add",
          itemId: "/add-admin",
          icon: () => <img src={dashboardIcon} alt="icon" />,
        },
      ],
    },
    {
      title: "Contacts",
      itemId: "/contacts",
      icon: () => <img src={dashboardIcon} alt="icon" />,
      children: true,
      subNav: [
        {
          title: "View",
          itemId: "/view-contacts",
          icon: () => <img src={dashboardIcon} alt="icon" />,
        },
        {
          title: "Add",
          itemId: "/add-contacts",
          icon: () => <img src={dashboardIcon} alt="icon" />,
        },
      ],
    },
  ];

  return (
    <>
      <div className="w-full h-[76px] bg-[#F0F6FF] flex justify-center items-center">
        <p 
          className='font-bold whitespace-nowrap font-arc text-[28px] text-GREY-_400 m-10'
          onClick={() => navigate("/view-news")}
        >
          D44 Technologies
        </p>
        {/* <img
          src={logo}
          alt="logo"
          loading="lazy"
          className="z-30 cursor-pointer h-[41px] w-44"
          onClick={() => navigate("/view-news")}
        /> */}
      </div>
      <div className="w-full">
        <div className="px-[10%] py-[8%] flex flex-col gap-8">
          <Navigation
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
              // Prevent navigation for parent items with children
              const selectedItem = menuItems.find(item => item.itemId === itemId);
              if (selectedItem?.children) return;
              navigate(itemId, { state: { title: "title" }} );
            }}
            items={menuItems.map((item) => ({
              title: <p className="text-lg">{item.title}</p>,
              itemId: item.itemId,
              elemBefore: item.icon,
              subNav: item.children ? item.subNav : undefined,
            }))}
          />
        </div>
      </div>
    </>
  );
}
