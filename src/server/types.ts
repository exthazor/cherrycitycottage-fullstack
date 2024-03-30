interface RoomData {
    count: number;
    price: number;
    totalPrice: number;
  }
  
  interface RoomsData {
    [key: string]: RoomData;
  }
  
  interface FormState {
    phoneNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    errorMessage: string;
    specialRequest: string;
  }
  
export interface State {
    roomsData: RoomsData;
    form: FormState;
    stayDuration: number;
    amount: number;
    alert: boolean;
    items: any[]; // You might want to define a more specific type for items
  }
  
export  type Action =
  | { type: 'UPDATE_ROOM_COUNT'; payload: { roomType: string; count: number } }
  | { type: 'UPDATE_FORM_FIELD'; payload: { fieldName: keyof FormState; value: any } }
  | { type: 'SET_STAY_DURATION'; payload: { startDate: string; endDate: string } }
  | { type: 'CALCULATE_TOTAL_AMOUNT' }
  | { type: 'SET_ALERT'; payload: boolean }
  | { type: 'UPDATE_ROOM_PRICE'; payload: { [key: string]: number } };