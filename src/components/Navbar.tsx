// import React, { useState, Fragment } from "react";
// import Link from "next/link";
// import dayjs from "dayjs";
// import { DatePicker, Popover } from "antd";
// const { RangePicker } = DatePicker;
// import "antd/dist/antd";
// import moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";
// import Image from "next/image";
// const Room = require("../images/room.svg")
// const Minus = require ("../images/minus.svg")
// const Logo = require("../images/logo.png")
// const Plus = require("../images/plus.svg")
// const People = require("../images/people.svg")
// import PopoverContent from "./Popover";

// export function Navbar(props: any) {
//   const [open, setOpen] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [occupancy, setOccupancy] = useState("2 ADULTS - 1 ROOM");
//   const [roomList, setRoomList] = useState();
//   const [rooms, setRooms] = useState(1);
//   const [adults, setAdults] = useState(2);
//   const [startDate, setStartDate] = useState(dayjs().add(1, "days"));
//   const [endDate, setEndDate] = useState(dayjs().add(2, "days"));
//   const [promoCode, setPromoCode] = useState("");

//   const handleOpenChange = (newOpen: boolean) => {
//     setOpen(newOpen);
//   };

//   const handleRoomsChange = (increment: boolean) => {
//     setRooms(prev => increment ? prev + 1 : Math.max(1, prev - 1));
//    };

//   const handleAdultsChange = (increment: boolean) => {
//     setAdults(prev => increment ? prev + 1 : Math.max(1, prev - 1));
//   };

//   const [navbar, setNavbar] = useState(false);

//   const updateOccupancy = () => {
//     setOccupancy(`${adults} Adult${adults > 1 ? 's' : ''} - ${rooms} Room${rooms > 1 ? 's' : ''}`);
//     setOpen(false);
//   };

  
//   const datesSelected = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
//     setStartDate(dates[0]);
//     setEndDate(dates[1]);
//    };

//   return (  
//     <nav className="bg-[#F1EDEA] px-2 sm:px-4 py-2.5 rounded shadow-lg w-full">
//       <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 flex flex-row">
//         {navbar ? (<></>) : (
//           <Link href={{ pathname: "/"}}>
//           <Image src={Logo}
//             alt="Logo"
//             height={150}
//             width={150}    
//           />
//         </Link>
//         )}
        
//         <div className="flex md:order-2">
//         <Link href={{ pathname: "/rooms", query: { startDate: startDate, endDate: endDate, noOfGuests: adults, noOfRooms: rooms, promoCode: promoCode }}}>
//           <button className="text-white md:inline-flex items-center bg-orange-900 border-0 focus:outline-none hover:bg-neutral-800 text-base font-medium px-5 py-2.5 text-center mr-3 md:mr-0 display hidden md:visible">
//                 CHECK
//           </button>
//         </Link>
//         <div className="md:hidden ml-auto mt-5">
//               <button
//                 className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
//                 onClick={() => setNavbar(!navbar)}
//               >
//               {navbar ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-6 h-6"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//                 )}
//               </button>
//             </div>
//         </div>
//       <div
//           className={`w-full flex flex-col pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//             navbar ? "block" : "hidden"
//           }`}
//         >
//         <ul className="items-center md:flex-row flex flex-col justify-center space-y-8 md:space-x-10 md:space-y-0">
//           <li className="items-center justify-center">
//             <RangePicker
//                  format="D MMM YYYY"
//                  disabledDate={(current: any) => current.isBefore(moment())}
//                  dropdownClassName={"createDateRangePicker"}
//                  onChange={() => datesSelected)}
//                  defaultValue={[dayjs().add(1, "days"), dayjs().add(2, "days")]}
//                  className="py-2 pl-3 pr-4 md:bg-transparent border-black bg-[#F1EDEA]"
//                  style={{
//                    textTransform: 'capitalize'
//                  }}
//                />          
//             </li>
//           <li className="text-gray-600">
//           <Popover 
//             content={<PopoverContent
//              rooms={rooms}
//              adults={adults}
//              addRooms={() => handleRoomsChange(true)}
//              removeRooms={() => handleRoomsChange(false)}
//              addAdults={() => handleAdultsChange(true)}
//              removeAdults={() => handleAdultsChange(false)}
//              updateOccupancy={updateOccupancy}
//            />}
//             placement="bottom"
//             trigger="click"
//             open={open}
//             onOpenChange={handleOpenChange}
//             >           
//   <button className="font-serif text-black">{occupancy}</button>
// </Popover>
    
//            </li>
//            <li>
//            <Link href={{ pathname: "/rooms", query: { startDate: startDate, endDate: endDate, noOfGuests: adults, noOfRooms: rooms, promoCode: promoCode }}}>
//               <button className="text-white inline-flex items-center bg-orange-900 border-0 focus:outline-none hover:bg-neutral-800 text-base font-medium px-5 py-2.5 text-center mr-3 md:mr-0 visible md:invisible">
//                 CHECK
//               </button>
//             </Link>
//            </li>
//         </ul>
//       </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar;
