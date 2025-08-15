import { FaLock, FaSliders, FaUser } from "react-icons/fa6";
import { TbPackages } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";

// Define tabs
export const tabs = [
  {
    id: 8,
    icon: FaBoxOpen,
    label: "Manage Orders",
    href: "/dashboard/orders",
    pageTitle: "All Orders",
    permission: "Manage Orders",
  },
  {
    id: 6,
    icon: TbPackages,
    label: "Manage Category",
    href: "/dashboard/category",
    pageTitle: "Manage Category",
    permission: "Manage Category",
  },
  // {
  //   id: 1,
  //   icon: TbPackageExport,
  //   label: "Manage Subcategory",
  //   pageTitle: "Mange Subcategory",
  //   permission: "Manage Subcategory",
  //   href: "/dashboard/sub-category",
  // },
  {
    id: 7,
    icon: MdProductionQuantityLimits,
    label: "Manage Products",
    href: "/dashboard/products",
    pageTitle: "Manage Products",
    permission: "Manage Products",
  },

  {
    id: 14,
    icon: FaSliders,
    label: "Manage Banners",
    href: "/dashboard/banners",
    pageTitle: "All Banners",
    permission: "Manage Banners",
  },
  {
    id: 10,
    icon: FaQuestionCircle,
    label: "Manage Contact Us",
    href: "/dashboard/contacts",
    pageTitle: "All Contacts",
    permission: "Manage Contact Us",
  },
  {
    id: 10,
    icon: FaUser,
    label: "Manage Users",
    href: "/dashboard/users",
    pageTitle: "All Users",
    permission: "Manage Users",
  },
  {
    id: 10,
    icon: FaLock,
    label: "Manage Requests",
    href: "/dashboard/contacts",
    pageTitle: "All Request",
    permission: "Manage Requests",
  },
];
