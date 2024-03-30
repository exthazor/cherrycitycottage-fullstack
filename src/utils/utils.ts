
export const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  }

export const calculateRoomNo = (noOfStandardRooms: any, noOfDeluxeRooms: any, roomList: any) => {
  let arr: number[] = []
  for(let i=0; i<noOfStandardRooms; i++){
    if(roomList[i].Room_Type.RoomTypeName == 'Double Occupancy'){
      arr.push(roomList[i].id)
    }
  }
  for(let i=0; i<noOfDeluxeRooms; i++){
    if(roomList[i].Room_Type.RoomTypeName == 'Triple Occupancy'){
      arr.push(roomList[i].id)
    }
  }
  return arr
}