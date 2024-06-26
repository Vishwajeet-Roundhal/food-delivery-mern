// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/aspect-ratio'),
//     ],
//   }
//   ```
// */
// import { Fragment, useState } from 'react'
// import {
//   Dialog,
//   DialogPanel,
//   Popover,
//   PopoverButton,
//   PopoverGroup,
//   PopoverPanel,
//   Tab,
//   TabGroup,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Transition,
//   TransitionChild,
// } from '@headlessui/react'
// import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

// // const navigation = {
// //   categories: [
// //     {
// //       id: 'Indian',
// //       name: 'Indian',
// //       featured: [
// //         {
// //           name: 'New Arrivals',
// //           href: '#',
// //           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
// //           imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
// //         },
// //         {
// //           name: 'Basic Tees',
// //           href: '#',
// //           imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
// //           imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
// //         },
// //       ],
// //       sections: [
// //         {
// //           id: 'clothing',
// //           name: 'Clothing',
// //           items: [
// //             { name: 'Tops', href: '#' },
// //             { name: 'Dresses', href: '#' },
// //             { name: 'Pants', href: '#' },
// //             { name: 'Denim', href: '#' },
// //             { name: 'Sweaters', href: '#' },
// //             { name: 'T-Shirts', href: '#' },
// //             { name: 'Jackets', href: '#' },
// //             { name: 'Activewear', href: '#' },
// //             { name: 'Browse All', href: '#' },
// //           ],
// //         },
// //         {
// //           id: 'accessories',
// //           name: 'Accessories',
// //           items: [
// //             { name: 'Watches', href: '#' },
// //             { name: 'Wallets', href: '#' },
// //             { name: 'Bags', href: '#' },
// //             { name: 'Sunglasses', href: '#' },
// //             { name: 'Hats', href: '#' },
// //             { name: 'Belts', href: '#' },
// //           ],
// //         },
// //         {
// //           id: 'brands',
// //           name: 'Brands',
// //           items: [
// //             { name: 'Full Nelson', href: '#' },
// //             { name: 'My Way', href: '#' },
// //             { name: 'Re-Arranged', href: '#' },
// //             { name: 'Counterfeit', href: '#' },
// //             { name: 'Significant Other', href: '#' },
// //           ],
// //         },
// //       ],
// //     },
// //     {
// //       id: 'men',
// //       name: 'Men',
// //       featured: [
// //         {
// //           name: 'New Arrivals',
// //           href: '#',
// //           imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
// //           imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
// //         },
// //         {
// //           name: 'Artwork Tees',
// //           href: '#',
// //           imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
// //           imageAlt:
// //             'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
// //         },
// //       ],
// //       sections: [
// //         {
// //           id: 'clothing',
// //           name: 'Clothing',
// //           items: [
// //             { name: 'Tops', href: '#' },
// //             { name: 'Pants', href: '#' },
// //             { name: 'Sweaters', href: '#' },
// //             { name: 'T-Shirts', href: '#' },
// //             { name: 'Jackets', href: '#' },
// //             { name: 'Activewear', href: '#' },
// //             { name: 'Browse All', href: '#' },
// //           ],
// //         },
// //         {
// //           id: 'accessories',
// //           name: 'Accessories',
// //           items: [
// //             { name: 'Watches', href: '#' },
// //             { name: 'Wallets', href: '#' },
// //             { name: 'Bags', href: '#' },
// //             { name: 'Sunglasses', href: '#' },
// //             { name: 'Hats', href: '#' },
// //             { name: 'Belts', href: '#' },
// //           ],
// //         },
// //         {
// //           id: 'brands',
// //           name: 'Brands',
// //           items: [
// //             { name: 'Re-Arranged', href: '#' },
// //             { name: 'Counterfeit', href: '#' },
// //             { name: 'Full Nelson', href: '#' },
// //             { name: 'My Way', href: '#' },
// //           ],
// //         },
// //       ],
// //     },
// //   ],
// //   pages: [
// //     { name: 'Company', href: '#' },
// //     { name: 'Stores', href: '#' },
// //   ],
// // }

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Navbar() {
//   const [open, setOpen] = useState(false)

//   return (
//     <div className="bg-white">
//       {/* Mobile menu */}
//       <Transition show={open}>
//         <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
//           <TransitionChild
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </TransitionChild>

//           <div className="fixed inset-0 z-40 flex">
//             <TransitionChild
//               enter="transition ease-in-out duration-300 transform"
//               enterFrom="-translate-x-full"
//               enterTo="translate-x-0"
//               leave="transition ease-in-out duration-300 transform"
//               leaveFrom="translate-x-0"
//               leaveTo="-translate-x-full"
//             >
//               <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
//                 <div className="flex px-4 pb-2 pt-5">
//                   <button
//                     type="button"
//                     className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//                     onClick={() => setOpen(false)}
//                   >
//                     <span className="absolute -inset-0.5" />
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>

//                 {/* Links */}
//                 <TabGroup className="mt-2">
//                   <div className="border-b border-gray-200">
//                     <TabList className="-mb-px flex space-x-8 px-4">
//                       {/* {navigation.categories.map((category) => (
//                         <Tab
//                           key={category.name}
//                           className={({ selected }) =>
//                             classNames(
//                               selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
//                               'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
//                             )
//                           }
//                         >
//                           {category.name}
//                         </Tab>
//                       ))} */}
//                     </TabList>
//                   </div>
//                   <TabPanels as={Fragment}>
//                     {/* {navigation.categories.map((category) => (
//                       <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
//                         <div className="grid grid-cols-2 gap-x-4">
//                           {category.featured.map((item) => (
//                             <div key={item.name} className="group relative text-sm">
//                               <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
//                                 <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
//                               </div>
//                               <a href={item.href} className="mt-6 block font-medium text-gray-900">
//                                 <span className="absolute inset-0 z-10" aria-hidden="true" />
//                                 {item.name}
//                               </a>
//                               <p aria-hidden="true" className="mt-1">
//                                 Shop now
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                         {category.sections.map((section) => (
//                           <div key={section.name}>
//                             <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
//                               {section.name}
//                             </p>
//                             <ul
//                               role="list"
//                               aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
//                               className="mt-6 flex flex-col space-y-6"
//                             >
//                               {section.items.map((item) => (
//                                 <li key={item.name} className="flow-root">
//                                   <a href={item.href} className="-m-2 block p-2 text-gray-500">
//                                     {item.name}
//                                   </a>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </TabPanel>
//                     ))} */}
//                   </TabPanels>
//                 </TabGroup>

//                 {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                   {navigation.pages.map((page) => (
//                     <div key={page.name} className="flow-root">
//                       <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
//                         {page.name}
//                       </a>
//                     </div>
//                   ))}
//                 </div> */}
//                 <div className="first">Hello</div>

//                 <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                   <div className="flow-root">
//                     <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
//                       Sign in
//                     </a>
//                   </div>
//                   <div className="flow-root">
//                     <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
//                       Create account
//                     </a>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 px-4 py-6">
//                   <a href="#" className="-m-2 flex items-center p-2">
//                     <img
//                       src="https://tailwindui.com/img/flags/flag-canada.svg"
//                       alt=""
//                       className="block h-auto w-5 flex-shrink-0"
//                     />
//                     <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
//                     <span className="sr-only">, change currency</span>
//                   </a>
//                 </div>
//               </DialogPanel>
//             </TransitionChild>
//           </div>
//         </Dialog>
//       </Transition>

//       <header className="relative bg-white">
//         <p className="flex h-10 items-center justify-center bg-orange-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
//           Get free delivery on orders over $100
//         </p>

//         <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="border-b border-gray-200">
//             <div className="flex h-16 items-center">
//               <button
//                 type="button"
//                 className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
//                 onClick={() => setOpen(true)}
//               >
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Open menu</span>
//                 <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//               </button>

//               {/* Logo */}
//               <div className="ml-4 flex lg:ml-0">
//                 <a href="#">
//                   <span className="sr-only">Your Company</span>
//                   <img
//                     className="h-14 w-auto"
//                     src="https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png"
//                     alt=""
//                   />
//                 </a>
//               </div>

//               {/* Flyout menus */}

//               <div className="ml-auto flex items-center">
//                 <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                   <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
//                     Sign in
//                   </a>
//                   <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
//                   <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
//                     Create account
//                   </a>
//                 </div>

//                 <div className="hidden lg:ml-8 lg:flex">
//                   <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
//                     <img
//                       src="https://tailwindui.com/img/flags/flag-canada.svg"
//                       alt=""
//                       className="block h-auto w-5 flex-shrink-0"
//                     />
//                     <span className="ml-3 block text-sm font-medium">CAD</span>
//                     <span className="sr-only">, change currency</span>
//                   </a>
//                 </div>

//                 {/* Search */}
//                 <div className="flex lg:ml-6">
//                   <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
//                     <span className="sr-only">Search</span>
//                     <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
//                   </a>
//                 </div>

//                 {/* Cart */}
//                 <div className="ml-4 flow-root lg:ml-6">
//                   <a href="#" className="group -m-2 flex items-center p-2">
//                     <ShoppingBagIcon
//                       className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                       aria-hidden="true"
//                     />
//                     <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
//                     <span className="sr-only">items in cart, view bag</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   )
// }
import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiFillTag,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsFillCartFill, BsFillSaveFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import HomePage from "../../pages/HomePage/HomePage";
import MainCrosel from "../HomeMainCarousal/MainCrosel";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick=()=>{
    console.log("Cliked");
    window.location.href =<HomePage></HomePage>;
  }
  return (
    <div className="max-w-[1640px] mx-auto flex justify-between p-4 items-center">
      {/* left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <button onClick={handleClick}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
            Best<span className="font-bold">Eats</span>
          </h1>
        </button>
        <div className="hidden lg:flex item-center bg-gray-200 rounded-full p-1 text-[14px]">
          <p className="bg-black text-white rounded-full p-2">Delivery</p>
          <p className="p-2">Pickup</p>
        </div>
      </div>
      {/* search */}
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search Foods"
        />
      </div>

      <li>
        <Link to="/registerRestaurant">Register your own restaurant</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>

      {/* Cart button */}
      <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full ">
        <BsFillCartFill size={20} className="mr-2" />
        Cart
      </button>

      {/* Mobile menu  */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 "></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 h-screen w-[300px] bg-white duration-300 z-10"
            : "fixed top-0 left-[-100%] h-screen w-[300px] bg-white duration-300 z-10"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute top-4 right-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Best<span className="font-bold">Eats</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex">
              <TbTruckDelivery size={25} className="mr-4" />
              Orders
            </li>
            <li className="text-xl py-4 flex">
              <MdFavorite size={25} className="mr-4" />
              Favorites
            </li>
            <li className="text-xl py-4 flex">
              <FaWallet size={25} className="mr-4" />
              Wallet
            </li>
            <li className="text-xl py-4 flex">
              <MdHelp size={25} className="mr-4" />
              Help
            </li>
            <li className="text-xl py-4 flex">
              <AiFillTag size={25} className="mr-4" />
              Promotions
            </li>
            <li className="text-xl py-4 flex">
              <BsFillSaveFill size={25} className="mr-4" />
              Best Ones
            </li>
            <li className="text-xl py-4 flex">
              <FaUserFriends size={25} className="mr-4" />
              Invite Friends
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
