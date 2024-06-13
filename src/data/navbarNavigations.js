import categoriesMegaMenu from "./categoriesMegaMenu";
import { useEffect } from "react"; // MEGAMENU DATA

const navbarNavigations = [
  {
    title: "Home",
    megaMenu: false,
    megaMenuWithSub: false,
    url: "/",
    // child: [
    // {
    //   title: "Market 1",
    //   url: "/market-1",
    // },
    // {
    //   title: "Market 2",
    //   url: "/market-2",
    // },
    // {
    //   title: "Furniture",
    //   url: "/furniture-shop",
    // },
    // {
    //   title: "Grocery 1",
    //   url: "/grocery1",
    // },
    // {
    //   title: "Grocery 2",
    //   url: "/grocery2",
    // },
    // {
    //   title: "Grocery 3",
    //   url: "/grocery3",
    // },
    // {
    //   title: "Health and Beauty",
    //   url: "/healthbeauty-shop",
    // },
    // {
    //   title: "Fashion 1",
    //   url: "/fashion-shop-1",
    // },
    // {
    //   title: "Fashion 2",
    //   url: "/fashion-shop-2",
    // },
    // {
    //   title: "Fashion 3",
    //   url: "/fashion-shop-3",
    // },
    // {
    //   title: "Gift Store",
    //   url: "/gift-shop",
    // },
    // {
    //   title: "Gadget",
    //   url: "/gadget-shop",
    // },
    // ],
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Barcode",
    url: "/barcode",
    // child: megaMenus,
    // child:[
    //     {
    //   title: "Counter 1",
    //   url: "/counter-1",
    //   },
    //   {
    //   title: "Counter 2",
    //   url: "/counter-2",
    //   }
    // ]
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Buy Back",
    url: "/buy-back",
    // child: categoriesMegaMenu,
  },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Rotate Goods",
    url: "/rotate-goods",
    // child:[
    //   {
    //     title: "Import Goods",
    //     url: "/import-goods",
    //   },
    //   {
    //     title: "Rotate Goods",
    //     url: "/route-goods",
    //   }
    // ],
  },
  // {
  //   megaMenu: false,
  //   megaMenuWithSub: false,
  //   title: "Handle Accounting",
  //   url:"/handle-accounting",
  //   // child: [
  //   //   {
  //   //     title: "Orders",
  //   //     child: [
  //   //       {
  //   //         title: "Order List",
  //   //         url: "/orders",
  //   //       },
  //   //       {
  //   //         title: "Order Details",
  //   //         url: "/orders/5452423",
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     title: "Profile",
  //   //     child: [
  //   //       {
  //   //         title: "View Profile",
  //   //         url: "/profile",
  //   //       },
  //   //       {
  //   //         title: "Edit Profile",
  //   //         url: "/profile/edit",
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     title: "Address",
  //   //     child: [
  //   //       {
  //   //         title: "Address List",
  //   //         url: "/address",
  //   //       },
  //   //       {
  //   //         title: "Add Address",
  //   //         url: "/address/512474",
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     title: "Support tickets",
  //   //     child: [
  //   //       {
  //   //         title: "All tickets",
  //   //         url: "/support-tickets",
  //   //       },
  //   //       {
  //   //         title: "Ticket details",
  //   //         url: "/support-tickets/512474",
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     title: "Wishlist",
  //   //     url: "/wish-list",
  //   //   },
  //   // ],
  // },
  // {
  //
  //   megaMenu: false,
  //   megaMenuWithSub: false,
  //   title: "Report",
  //   url: "/vendor/dashboard"
  //   // child: [
  //   {
  //     title: "Dashboard",
  //     url: "/vendor/dashboard",
  //   },
  //   {
  //     title: "Products",
  //     child: [
  //       {
  //         title: "All products",
  //         url: "/admin/products",
  //       },
  //       {
  //         title: "Add/Edit product",
  //         url: "/admin/products/248104",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Orders",
  //     child: [
  //       {
  //         title: "All orders",
  //         url: "/admin/orders",
  //       },
  //       {
  //         title: "Order details",
  //         url: "/admin/orders/248104",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Profile",
  //     url: "/vendor/account-setting",
  //   },
  // ],
  // },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Logout",
    url: "/login",
  },
];
export default navbarNavigations;
