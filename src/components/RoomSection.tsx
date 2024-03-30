import React from 'react';
import { Select } from 'antd';
import Image from 'next/image';
import { actionTypes } from '~/utils/actionTypes';
import Carousel from './Carousel';

const { Option } = Select;

interface RoomData {
  name: string;
  description: string;
  price: number;
  capacity: number;
  images: string[];
  totalRooms: number;
}

interface RoomSectionProps {
  roomData: RoomData;
  roomCount: number;
  dispatch: any;
}

const RoomSection: React.FC<RoomSectionProps> = ({ roomData, roomCount, dispatch }) => {
    const { name, description, price, capacity, images, totalRooms } = roomData;

    const updateRoomCount = (value: number) => {
      dispatch({
        type: actionTypes.UPDATE_ROOM_COUNT,
        payload: { roomType: name, count: value },
      });
    };


    return (
      <>
      <div className="room-section-container flex flex-row justify-between items-center bg-white overflow-hidden m-4">
        {/* Display the first image as a representative; adjust as needed */}
        <div className="carousel-container flex-none w-full md:w-1/2 h-64 relative mb-4">
          {images && images[0] && (
          <Carousel images={images.map(image => ({ src: image, alt: name, height: 250, width: 333 }))} />
          )}
        </div>
        <div className="room-details">
          <h3>{name} - Breakfast Included</h3>
          <p>{description}</p>
          <div className="room-selection">
            <Select defaultValue={roomCount} onChange={updateRoomCount}>
              {Array.from({ length: totalRooms }, (_, index) => (
                <Option key={index + 1} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>
            <p>Total Price: ₹{price * roomCount}</p>
          </div>
        </div>
      </div>
      </>
    );
};

export default RoomSection;
