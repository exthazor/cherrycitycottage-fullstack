import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DatePicker, Popover } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';

const logoSrc = '/images/navbar/logo.png';
const roomIconSrc = '/images/navbar/room.svg';
const minusIconSrc = '/images/navbar/minus.svg';
const plusIconSrc = '/images/navbar/plus.svg';
const peopleIconSrc = '/images/navbar/people.svg';

const { RangePicker } = DatePicker;

export function HomeNavbar() {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [occupancy, setOccupancy] = useState("2 ADULTS - 1 ROOM");
    const [roomList, setRoomList] = useState();
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [startDate, setStartDate] = useState(dayjs().add(1, "days"));
    const [endDate, setEndDate] = useState(dayjs().add(2, "days"));
    const promoCode = "";

    const datesSelected = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
     setStartDate(dates[0]);
     setEndDate(dates[1]);
    };
  
    const handleRoomsChange = (increment: boolean) => {
     setRooms(prev => increment ? prev + 1 : Math.max(1, prev - 1));
    };
    
    const handleAdultsChange = (increment: boolean) => {
      setAdults(prev => increment ? prev + 1 : Math.max(1, prev - 1));
    };
    
    const updateOccupancy = () => {
      setOccupancy(`${adults} Adult${adults > 1 ? 's' : ''} - ${rooms} Room${rooms > 1 ? 's' : ''}`);
      setOpen(false);
    };
    
    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
    };
  
    const PopoverContent = () => {
      return (
        <div className="p-3 w-full flex flex-col relative">
          <div className="flex flex-col">
            <div className="p-2 flex space-x-20 justify-between items-center ">
              <div className="flex text-sm items-center space-x-2">
                <Image src={roomIconSrc} alt="Room" width={20} height={20} />
                <p>Rooms</p>
              </div>
              <div className="flex space-x-4 border p-2">
                <p>
                  <Image
                    src={minusIconSrc}
                    alt="Minus"
                    onClick={() => handleRoomsChange(false)}
                    width={9}
                    height={9}
                    className="bg-gray-light h-6 cursor-pointer"
                  />
                </p>
                <p>{rooms}</p>
                <Image
                  src={plusIconSrc}
                  alt="Plus"
                  onClick={() => handleRoomsChange(true)}
                  width={9}
                  height={9}
                  className=" bg-gray-light h-6 cursor-pointer"
                />
              </div>
            </div>
            <div className="p-2 flex justify-between items-center">
              <div className="flex text-sm items-center space-x-2">
                <Image src={peopleIconSrc} alt="People" width={20} height={20} />
                <p>Adults</p>
              </div>
              <div className="flex space-x-4 border p-2">
                <p>
                  <Image
                    src={minusIconSrc}
                    alt="Minus"
                    width={9}
                    height={9}
                    onClick={() => handleAdultsChange(false)}
                    className="h-6 bg-gray-light cursor-pointer"
                  />
                </p>
                <p>{adults}</p>
                <Image
                  src={plusIconSrc}
                  alt="Plus"
                  onClick={() => handleAdultsChange(true)}
                  width={9}
                  height={9}
                  className="h-6 bg-gray-light cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button
              className="p-2 bg-black w-full text-white"
              onClick={updateOccupancy}
            >
              Update
            </button>
          </div>
        </div>
      );
    };
  
    return (
      <>
        {showModal ? (
          <div className="mb-80 absolute h-screen w-screen flex flex-wrap z-50 bg-grey-lighter bg-[#F1EDEA]">
            <div className="container px-5 py-24 mx-auto">
              <button onClick={() => setShowModal(false)}>
                <svg
                  width="51"
                  height="50"
                  viewBox="0 0 51 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1218_6243)">
                    <path
                      d="M6.70605 41.2551C7.66911 41.4731 8.11943 42.1007 8.66337 42.5457C11.4946 44.8732 14.6869 46.4442 18.2582 47.2942C20.1487 47.7437 22.0971 47.717 24.0054 48.0152C24.6786 48.122 25.3519 48.2555 26.0206 48.3668C27.1576 48.5537 28.3391 48.8741 29.4404 48.0686C29.7614 47.8327 30.2697 47.8372 30.6977 47.7526C32.7442 47.3565 34.6079 46.5733 36.3334 45.3717C37.7066 44.4104 39.227 43.6583 40.6403 42.7504C42.4372 41.5933 44.1359 40.3383 44.6442 38.0553C44.8002 37.3477 45.3932 36.9382 45.9951 36.5777C46.6594 36.1772 47.2212 35.6476 47.2836 34.8421C47.404 33.3156 48.0148 31.9538 48.6123 30.592C49.1473 29.3726 49.29 28.2244 48.5588 27.0361C48.2244 26.4932 48.0505 25.8924 48.376 25.2649C49.0225 24.0188 48.9957 22.9106 48.5766 21.4509C48.0906 19.7509 47.676 17.9885 47.1187 16.2929C46.8066 15.3494 46.7352 14.5172 47.19 13.5737C48.8843 16.1549 49.825 18.972 49.7804 21.9627C49.7537 23.8897 50.048 25.7767 50.0524 27.6547C50.0569 30.1113 49.446 32.6258 48.1263 34.7842C46.7976 36.956 45.5849 39.2079 44.0467 41.2462C42.727 42.9907 41.3582 44.6285 39.276 45.5808C37.9251 46.1994 36.8951 47.4589 35.4639 47.9173C32.1869 48.972 28.941 50.1558 25.3742 49.9823C24.0098 49.9155 22.6678 49.8399 21.3079 49.6663C18.5124 49.3103 16.1003 48.0019 13.6659 46.7646C12.0073 45.9235 10.4602 44.851 8.89076 43.8452C7.97229 43.2533 7.09395 42.5857 6.70605 41.2551Z"
                      fill="#7b341e"
                    ></path>
                    <path
                      d="M4.29403 11.9671C4.89594 9.94666 7.07619 8.87857 7.47746 6.73349C9.39911 5.05125 11.4411 3.52477 13.7106 2.34542C14.1832 2.10065 14.7895 2.05614 15.3424 2.02054C16.2297 1.96269 17.05 1.93598 17.5851 1.0103C17.866 0.525213 18.5348 0.458458 19.0787 0.329397C20.4163 0.00451907 21.7672 -0.10674 23.1316 0.124679C23.1271 0.409503 22.9398 0.516313 22.7749 0.534114C19.9214 0.818938 17.5628 2.30981 15.0169 3.43131C12.9036 4.36144 11.2093 5.72326 9.40803 7.01832C9.06026 7.26754 8.55644 7.55236 8.48064 7.89949C8.03033 9.87101 5.89912 10.2092 4.92715 11.6556C4.81569 11.8203 4.48129 11.8381 4.25391 11.9226L4.29403 11.9671Z"
                      fill="#7b341e"
                    ></path>
                    <path
                      d="M0.593492 29.5194C-0.503319 25.2382 0.0807553 21.0681 1.46738 16.9604C1.98903 18.0463 1.3247 19.0076 1.12852 20.0045C0.923428 21.037 0.589034 22.0472 0.535531 23.102C0.482028 24.2146 0.575658 25.345 0.441901 26.4442C0.312602 27.4989 0.754002 28.4914 0.593492 29.5194Z"
                      fill="#7b341e"
                    ></path>
                    <path
                      d="M4.03096 37.4856C2.69784 35.9146 1.44498 34.3169 1.40039 32.1541C2.26536 33.9431 3.05453 35.7678 4.03096 37.4856Z"
                      fill="#7b341e"
                    ></path>
                    <path
                      d="M43.3555 8.39355C44.6797 9.02106 45.3797 10.1737 46.2402 11.7091C44.4122 10.9881 43.886 9.68861 43.3555 8.39355Z"
                      fill="#7b341e"
                    ></path>
                    <path
                      d="M4.24483 11.9229C3.69642 12.9553 3.14802 13.9923 2.59961 15.0248C2.78241 13.7831 2.59069 12.3145 4.28941 11.9629C4.29387 11.9674 4.24483 11.9229 4.24483 11.9229Z"
                      fill="#7b341e"
                    ></path>
                    <path
                      d="M36.3691 2.83508C37.3054 2.71492 37.7558 3.06205 38.3443 3.7029C37.4972 3.66285 36.9978 3.44478 36.3691 2.83508Z"
                      fill="#7b341e"
                    ></path>
                    <g clipPath="url(#clip1_1218_6243)">
                      <path
                        d="M32.16 30.7045L26.1405 24.6885L32.16 18.7086C32.5499 18.3189 32.5499 17.6805 32.16 17.2938C31.7701 16.9071 31.1313 16.9041 30.7444 17.2938L24.7249 23.2737L18.7413 17.2908C18.3514 16.9011 17.7126 16.9011 17.3257 17.2908C16.9388 17.6805 16.9358 18.3189 17.3257 18.7056L23.3092 24.6856L17.3227 30.7045C16.9328 31.0941 16.9328 31.7326 17.3227 32.1193C17.7126 32.506 18.3514 32.509 18.7383 32.1193L24.7219 26.1034L30.7414 32.1193C31.1313 32.509 31.7701 32.509 32.157 32.1193C32.5439 31.7296 32.5499 31.0941 32.16 30.7045Z"
                        fill="#7b341e"
                      ></path>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_1218_6243">
                      <rect
                        width="50.0298"
                        height="50"
                        fill="#7b341e"
                        transform="translate(0.0224609)"
                      ></rect>
                    </clipPath>
                    <clipPath id="clip1_1218_6243">
                      <rect
                        width="15.4192"
                        height="15.41"
                        fill="#7b341e"
                        transform="translate(17.0322 17)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <div className="text-center w-full mb-12">
                <p className="text-2xl lg:w-2/3 mx-auto leading-relaxed bg-[#F1EDEA] font-medium">
                  book a room
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mx-auto md:w-1/4 w-full leading-relaxed">
                  <p className="text-[11px] bg-[#F1EDEA] font-medium text-center">
                    CHECK IN - CHECK OUT
                  </p>
                  <button>
                    <RangePicker
                      format="D MMM YYYY"
                      disabledDate={(current: any) => current.isBefore(moment())}
                      onChange={() => datesSelected}
                      defaultValue={[dayjs().add(1, "days"), dayjs().add(2, "days")]}
                      className="bg-[#F1EDEA] w-full md:ml-10 ml-7"
                    />
                  </button>
                  <hr className="my-5 h-px bg-black border-0" />
                </div>
                <div className="mx-auto md:w-1/4 w-full leading-relaxed">
                  <p className="text-[11px] bg-[#F1EDEA] font-medium text-center">
                    OCCUPANCY
                  </p>
                  <Popover
                    content={PopoverContent}
                    placement="bottom"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    className="w-full"
                  >
                    {/* <input type="text" readOnly value={occupancy} /> */}
                    <button className="font-serif font-light">{occupancy}</button>
                  </Popover>
                  <hr className="my-5 h-px bg-black border-0" />
                </div>
                <div className="mx-auto">
                <Link href={{ pathname: "/rooms"}}>
                  <button
                    className="text-white inline-flex items-center bg-orange-900 border-0 py-5 px-7 focus:outline-none hover:bg-neutral-800 text-base mt-4 md:mt-5"
                  >
                    SEE AVAILABILITY
                  </button>
                </Link>
                </div>
  
                <div className="p-2 w-full pt-20 mt-20 text-center">
                  <div>
                    <a href="mailto:reservations@cherrycitycottage.homes">
                      reservations@cherrycitycottage.homes
                    </a>
                  </div>
                  <br/>
                  <div>
                    <a href="tel:+919435016257">
                      +91 9435016257
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center mt-8">
          <nav className="lg:w-2/5 text-base md:ml-auto ml-6">
            <Link
              href="#reviews" scroll={true}
              className="mr-5 mb-20 text-white md:text-lg text-sm font-bold hover:text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            >
              REVIEWS
            </Link>
            <Link
              href="/"
              className="mr-5 mb-20 text-white md:text-lg text-sm font-bold hover:text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            >
              GALLERY
            </Link>
            <Link
              href="/"
              className="mr-5 mb-20 text-white md:text-lg text-sm font-bold hover:text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            >
              CALL US
            </Link>
          </nav>
          <a className="flex order-first lg:order-none lg:w-1/5 w-2/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <Image src={logoSrc} alt="logo" width={200} height={100}/>
          </a>
          <div className="lg:w-2/5 w-[70vw] inline-flex lg:justify-end lg:ml-0 md:mt-0 mt-96 md:pt-0">
            <button
              className="text-white inline-flex justify-center items-center bg-orange-900 border-0 py-5 px-7 focus:outline-none hover:bg-neutral-800 text-base mt-84 md:mt-0 md:w-fit w-full"
              onClick={() => setShowModal(true)}
            >
              <p className="text-center">
                RESERVE NOW
              </p>
            </button>
          </div>
        </div>
      </>
    );
  }

export default HomeNavbar;
