interface PopoverContentProps {
    rooms: number;
    adults: number;
    addRooms: () => void;
    removeRooms: () => void;
    addAdults: () => void;
    removeAdults: () => void;
    updateOccupancy: () => void;
  }

  import React from 'react';
  import Image from 'next/image';
  
  const PopoverContent: React.FC<PopoverContentProps> = ({
    rooms,
    adults,
    addRooms,
    removeRooms,
    addAdults,
    removeAdults,
    updateOccupancy
  }) => {
    const roomImage = "/images/navbar/room.svg"
    const peopleImage = "/images/navbar/people.svg"
    return (
        <div className="p-3 w-full flex flex-col">
          <div className="flex flex-col">
            <div className="p-2 flex space-x-20 justify-between items-center ">
              <div className="flex text-sm items-center space-x-2">
                <Image src={roomImage} alt="Room" width={20} height={20} />
                <p>Rooms</p>
              </div>
              <div className="flex space-x-4 border p-2">
                <p onClick={removeRooms} className="cursor-pointer">-</p>
                <p>{rooms}</p>
                <p onClick={addRooms} className="cursor-pointer">+</p>
              </div>
            </div>
            <div className="p-2 flex justify-between items-center">
              <div className="flex text-sm items-center space-x-2">
                <Image src={peopleImage} alt="People" width={20} height={20} />
                <p>Adults</p>
              </div>
              <div className="flex space-x-4 border p-2">
                <p onClick={removeAdults} className="cursor-pointer">-</p>
                <p>{adults}</p>
                <p onClick={addAdults} className="cursor-pointer">+</p>
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
  
  export default PopoverContent;
  