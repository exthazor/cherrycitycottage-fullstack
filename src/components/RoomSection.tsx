import { FC } from 'react';
import { Select } from 'antd';
import Carousel from "../components/Carousel";
const { Option } = Select;
import { actionTypes } from '~/utils/actionTypes';

interface RoomData {
  name: string;
  description: string;
  price: number;
  capacity: number;
  images: string[];
}

interface RoomData {
  name: string;
  description: string;
  price: number;
  capacity: number; // This could be renamed to reflect its actual use, like totalAvailableRooms
  images: string[];
  totalRooms: number; // Total available rooms of this type
}

interface RoomSectionProps {
  roomData: RoomData;
  roomCount: number;
  dispatch: any;
}

const RoomSection: FC<RoomSectionProps> = ({ roomData, roomCount, dispatch }) => {
    const { name, description, price, totalRooms, images } = roomData;
    return (
      <div className="flex flex-col mb-10 items-center w-2/3 mx-auto">
        <Carousel images={images.map((imageUrl) => ({
          src: imageUrl,
          height: 600,
          width: 800,
          alt: name,
        }))} />
        <div className="flex-grow mt-5">
          <h2 className="text-gray-900 md:text-xl md:title-font font-medium mb-3 text-center">
            {name} - Breakfast Included
          </h2>
          <p className="leading-relaxed md:text-base text-center text-sm">
            {description}
          </p>
          <div className="flex flex-row md:mt-6">
            <div className="flex flex-col">
              <p className="md:text-base text-sm">Number of rooms</p>
              <Select
                style={{ width: 110 }}
                bordered={false}
                value={roomCount}
                onChange={(value: number) => {
                  dispatch({
                    type: actionTypes.UPDATE_ROOM_COUNT,
                    payload: { roomType: name, count: value },
                  });
                }}
              >
                {Array.from({ length: totalRooms }, (_, i) => (
                  <Option key={i + 1} value={i + 1}>{i + 1}</Option>
                ))}
              </Select>
            </div>
            <p className="ml-auto my-3 md:text-base text-sm">₹{price}</p>
          </div>
        </div>
      </div>
    );
};

export default RoomSection;
