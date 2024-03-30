import React from 'react';
import moment from 'moment';
  
const BookingForm = ({
    startDate,
    endDate,
    roomsData
  }: {
    startDate: string,
    endDate: string,
    roomsData: {
      [key: string]: {
        count: number,
        price: number,
        totalPrice: number,
        totalRooms: number
      }
    }
  }) => {
    const stayDuration = moment(endDate).diff(startDate, 'days');
    const totalCost = Object.values(roomsData).reduce((total, { count, price }) => total + (count * price), 0) * stayDuration;

    return (
        <div className="w-full">
          <p className="md:text-xl text-base font-medium leading-7 text-center text-gray-700">Your booking details</p>
          <div className="flex flex-row w-full space-x-12 divide-x items-center justify-center">
            <div className="md:my-6 my-2">
                <p className="md:text-sm text-xs mb-3 font-medium">Check In</p>
                <p className="md:text-xl text-base font-semibold">{moment(startDate).format("MMM Do YY")}</p>
                <p className="text-sm text-gray-400 md:block hidden mt-1">From 12:00 pm</p>
            </div>
            <div className="md:my-6 my-2">
                <p className="md:text-sm text:xs mb-3 ml-16 font-medium">Check Out</p>
                <p className="md:text-xl text-base font-semibold ml-16">{moment(endDate).format("MMM Do YY")}</p>
                <p className="text-sm text-gray-400 md:block hidden mt-1 ml-16">Until 11:00 am</p>
            </div>
          </div>
          <hr className="md:mx-32 mx-8 mt-2"/>
          <div className="mt-6 flex flex-col items-center justify-center">
            {Object.entries(roomsData).map(([roomType, { count }]) =>
              count > 0 && (
                <p key={roomType} className='md:text-base text-xs'>{count} x {roomType} with Complimentary Breakfast</p>
              )
            )}
          </div>
          <hr className="md:mx-32 mx-8 mt-7"/>
          <div className="flex flex-row mt-6 justify-center items-center">
              <div className="flex flex-row space-x-8">
                  <div className="flex flex-col">
                      <p className="md:text-base text-sm">Price:</p>
                      <p className="text-xs text-gray-400">(for {stayDuration} {stayDuration > 1 ? 'nights' : 'night'} and all guests GST inclusive)</p> 
                  </div>
              <p className="md:text-base text-sm">₹{totalCost}</p>
              </div>
          </div>
          <hr className="md:mx-32 mx-8 mt-6"/>
        </div>
    );
};

export default BookingForm;