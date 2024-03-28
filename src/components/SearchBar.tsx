import React, { use, useState, useEffect } from "react";
import { DatePicker, Popover } from "antd";
const { RangePicker } = DatePicker;
import "antd/dist/antd";
import moment from "moment";
import CounterInput from "react-counter-input";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";

export const SearchBar = () => {
  const [startDate, setStartDate] = useState(dayjs().add(1, "days"));
    const [endDate, setEndDate] = useState(dayjs().add(2, "days"));
  const [noOfGuests, setNoOfGuests] = useState(Number);
  const [noOfRooms, setNoOfRooms] = useState(Number);
  const [promoCode, setPromoCode] = useState("");
  
  const datesSelected = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
   };

  return (
    <>
      <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
        <div>
          <div className="text-xs">CHECK OUT</div>
          <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
            <RangePicker
              format="D MMM YYYY"
              disabledDate={(current: any) => current.isBefore(moment())}
              onChange={() => datesSelected}
              defaultValue={[dayjs().add(1, "days"), dayjs().add(2, "days")]}
              className="bg-gray-100 border-none"
            />
          </div>
        </div>
        <div>
          <div className="text-xs">OCCUPANCY</div>
          <div className="flex bg-gray-100 p-2 w-21 rounded-lg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />

            <CounterInput
              min={0}
              max={10}
              onCountChange={(count: number) => setNoOfGuests(count)}
            />
          </div>
        </div>
        <div>
          <div className="text-xs">ROOMS</div>
          <div className="flex bg-gray-100 p-2 w-21 rounded-lg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />

            <CounterInput
              min={0}
              max={10}
              onCountChange={(count: number) => setNoOfRooms(count)}
            />
          </div>
        </div>
        <div>
          <div className="text-xs">PROMO</div>
          <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <input
              className="bg-gray-100 outline-none"
              type="text"
              placeholder="PROMO CODE"
            />
          </div>
        </div>
        <Link href={{ pathname: "/rooms"}}>
          <button
            className="text-white inline-flex items-center bg-orange-900 border-0 py-5 px-7 focus:outline-none hover:bg-neutral-800 text-base mt-4 md:mt-5"
          >
            SEE AVAILABILITY
          </button>
        </Link>
      </div>
    </>
  );
}

export default SearchBar;
