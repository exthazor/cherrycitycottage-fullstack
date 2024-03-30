import React, { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import BookingForm from "~/components/BookingForm";
import { actionTypes } from "~/utils/actionTypes";
import { trpc } from '~/utils/trpc';
import { isValidEmail } from "~/utils/validators";
import moment from "moment";
import Loader from "~/components/Loader";
import OPGoogleMap from "~/components/GoogleMap";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Rooms(props: any) {

  const Navbar = dynamic(async () => await import('../components/Navbar'), {
    ssr: false,
  })
  const RoomSection = dynamic(async () => await import('../components/RoomSection'), {
    ssr: false,
  })
  const router: any = useRouter()
  const { startDate, endDate, noOfGuests, noOfRooms, promoCode } = router.query;

// Fetch available rooms
  const { data: rooms, error, isLoading } = trpc.room.findAvailableRooms.useQuery({
    checkinDate: startDate as string,
    checkoutDate: endDate as string,
    noOfGuests: Number(noOfGuests),
    noOfRooms: Number(noOfRooms),
    promoCode: promoCode as string | undefined,
  }, {
    enabled: Boolean(startDate && endDate && noOfGuests && noOfRooms),
  });
  
  // Handling loading state
  if (isLoading) {
    return <Loader/>;
  }

  // Handling error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure rooms and rooms.availableRooms are defined before accessing
  if (!rooms || !rooms.availableRooms) {
    return <div>No data available</div>;
  }
    const initialState = {
        roomsData: {
            "Standard Room": { 
                count: 0, // number of rooms selected
                price: rooms?.roomTypes[0]?.price ?? 0, 
                capacity: rooms?.roomTypes[0]?.capacity ?? 0,
                totalPrice: 0, 
                totalRooms: 0, // number of rooms available 
                images: [
                "/images/hotel/rooms/standard/standard_1.jpg",
                "/images/hotel/rooms/standard/standard_2.jpg",
            ], 
            description: "Standard Room Description", 
            amenities: ["TV", "AC", "WIFI", "Breakfast"] 
        },
            "Deluxe Room": { 
                count: 0, // number of rooms selected
                price: rooms?.roomTypes[1]?.price ?? 0, 
                capacity: rooms?.roomTypes[1]?.capacity ?? 0,
                totalPrice: 0,
                totalRooms: 0, // number of rooms available 
                images: [
                    "/images/hotel/rooms/deluxe/deluxe_1.jpg",
                    "/images/hotel/rooms/deluxe/deluxe_2.jpg",
                ], 
                description: "Deluxe Room Description", 
                amenities: ["TV", "AC", "WIFI", "Breakfast"] 
            },
            "Kitchen Room": { 
                count: 0, // number of rooms selected
                price: rooms?.roomTypes[2]?.price ?? 0, 
                capacity: rooms?.roomTypes[2]?.capacity ?? 0,
                totalPrice: 0,
                totalRooms: 0, // number of rooms available 
                images: [
                    "/images/hotel/rooms/kitchen/kitchen_1.jpg",
                    "/images/hotel/rooms/kitchen/kitchen_2.jpg",
                  ], 
                  description: "Kitchen Room Description", 
                  amenities: ["TV", "AC", "WIFI", "Breakfast"] 
                },
            "Triple Room": { 
                count: 0, // number of rooms selected
                price: rooms?.roomTypes[3]?.price ?? 0, 
                capacity: rooms?.roomTypes[3]?.capacity ?? 0,
                totalRooms: 0, // number of rooms available 
                totalPrice: 0,
                images: [
                    "/images/hotel/rooms/triple/triple_1.jpg",
                    "/images/hotel/rooms/triple/triple_2.jpg",
                    ], 
                    description: "Triple Room Description", 
                    amenities: ["TV", "AC", "WIFI", "Breakfast"] 
            },
        },
        form: {
          phoneNumber: '',
          email: '',
          firstName: '',
          lastName: '',
          errorMessage: '',
          specialRequest: '',
        },
        stayDuration: 0,
        amount: 0,
        alert: false,
        items: [],
    };


    const reducer = (state: any, action: any) => {
      switch (action.type) {
        case actionTypes.UPDATE_TOTAL_AVAILABLE_ROOMS: {
          const { roomType, totalRooms } = action.payload;
          return {
            ...state,
            roomsData: {
              ...state.roomsData,
              [roomType]: {
                ...state.roomsData[roomType],
                totalRooms,
              },
            },
          };
        }
        
        case actionTypes.UPDATE_ROOM_COUNT: {
          // Extracts roomType and count from action.payload
          const { roomType, count } = action.payload;
          const pricePerRoom = state.roomsData[roomType]?.price ?? 0;
          const totalPrice = pricePerRoom * count;
          return {
            ...state,
            roomsData: {
              ...state.roomsData,
              [roomType]: {
                ...state.roomsData[roomType],
                count,
                totalPrice,
              },
            },
          };
        }
        
        case actionTypes.UPDATE_FORM_FIELD: {
          const { fieldName, value } = action.payload;
          return {
            ...state,
            form: {
              ...state.form,
              [fieldName]: value,
            },
          };
        }
  
        case actionTypes.SET_STAY_DURATION: {
          const { startDate, endDate } = action.payload;
          const stayDuration = moment(endDate).diff(moment(startDate), 'days');
          return {
            ...state,
            stayDuration,
          };
        }
  
        case actionTypes.SET_ERROR_MESSAGE: {
          const { fieldName: errorFieldName, message } = action.payload;
          return {
            ...state,
            form: {
              ...state.form,
              [`${errorFieldName}ErrorMessage"`]: message,
            },
          };
        }
  
        case actionTypes.CALCULATE_TOTAL_AMOUNT: {
          const totalAmount = Object.values(state.roomsData).reduce((sum, room: any) => sum + room.totalPrice, 0);
          return {
            ...state,
            amount: Number(totalAmount) * state.stayDuration,
          };
        }
  
        case actionTypes.SET_ALERT: {
          return {
            ...state,
            alert: action.payload,
          };
        }
  
        case actionTypes.UPDATE_ROOM_PRICE: {
          const updatedRoomsData = { ...state.roomsData };
          Object.entries(action.payload).forEach(([roomType, price]) => {
            if (updatedRoomsData[roomType]) {
              updatedRoomsData[roomType].price = price;
              updatedRoomsData[roomType].totalPrice = updatedRoomsData[roomType].count * Number(price);
            }
          });
          return {
            ...state,
            roomsData: updatedRoomsData,
          };
        }
  
        default:
          return state;
      }
  };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => { // update total available room of each type from BE response
      if (rooms && rooms.availableRooms) {
        rooms.availableRooms.forEach(room => {
          dispatch({
            type: actionTypes.UPDATE_TOTAL_AVAILABLE_ROOMS,
            payload: {
              roomType: room.roomType,
              totalRooms: room.count,
            },
          });
        });
      }
    }, [rooms, dispatch]);
    

    useEffect(() => { // allocate and update room counts based on guest numbers and requested rooms, optimise to meet both capacity and request constraints.
        const totalGuests = Number(router.query.noOfGuests);
        const totalRoomsRequested = Number(router.query.noOfRooms);
    
        interface RoomCapacities {
            [key: string]: number;
          }
          
          const roomCapacities: RoomCapacities = {
              "Standard Room": initialState.roomsData["Standard Room"].capacity,
              "Deluxe Room": initialState.roomsData["Deluxe Room"].capacity,
              "Kitchen Room": initialState.roomsData["Kitchen Room"].capacity,
              "Triple Room": initialState.roomsData["Triple Room"].capacity,
          };
          
          interface RoomAllocations {
            [key: string]: number;
          }
          
          const roomAllocations = Object.keys(roomCapacities).reduce<RoomAllocations>((allocations, roomType) => {
            const capacity = roomCapacities[roomType] ?? 0;
            let neededRooms = Math.ceil(totalGuests / capacity);

            if (neededRooms + allocations.totalAllocatedRooms!! > totalRoomsRequested) {
                neededRooms = totalRoomsRequested - allocations.totalAllocatedRooms!!;
            }

            allocations[roomType] = neededRooms;
            allocations.totalAllocatedRooms += neededRooms;

            // Ensure we do not exceed the total rooms requested
            if (allocations.totalAllocatedRooms!! >= totalRoomsRequested) {
                return allocations;
            }
          
              return allocations;
          }, { totalAllocatedRooms: 0 } as any);
          
    
        // Dispatch actions to update room counts based on the allocations
        Object.entries(roomAllocations).forEach(([roomType, count]) => {
            if (count > 0) {
                dispatch({
                    type: actionTypes.UPDATE_ROOM_COUNT,
                    payload: { roomType, count },
                });
            }
        });
    }, [router.query.noOfGuests, router.query.noOfRooms, dispatch]);

    
    const Checkout = async () => {

      // will be filled later during razorpay integration
    }
      

return (
    <>
      <section className="text-gray-600 body-font w-full">
        <Navbar/>

        {/* Main container */}
        <div className="container mx-auto">

          {/* Rooms section */}
          <div className="grid md:grid-cols-2 gap-4 my-8">

            {/* Standard Room section */}
            {Object.entries(state.roomsData).map(([roomType, roomDetails]) => (
              <RoomSection
                key={roomType}
                roomData={{
                  name: roomType,
                  description: (roomDetails as { description: string }).description,
                  price: (roomDetails as { price: number }).price,
                  capacity: (roomDetails as { capacity: number }).capacity,
                  images: (roomDetails as { images: string[] }).images,
                  totalRooms: (roomDetails as { totalRooms: number }).totalRooms
                }}
                roomCount={(roomDetails as { count: number }).count}
                dispatch={dispatch}
              />
            ))}
            
          </div>

          {/* Booking form */}
          <div className="w-full mb-10 lg:mb-0 rounded-lg md:shadow">
            <div className="lg:mt-6 mt-2">
            <BookingForm 
              startDate={router.query.startDate as string} 
              endDate={router.query.endDate as string} 
              roomsData={state.roomsData}
            />
            </div>
            {/* Alert box */}
            {state.alert && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Please fill the information below before proceeding for payment.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => dispatch({ type: actionTypes.SET_ALERT, payload: false })}>
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
            )}
            {/* Details form */}
            <div className="md:mx-2 mx-10 mt-8">
              <div className="bg-white rounded md:py-8 py-4 px-4">
                {/* Form fields */}
                <div className="flex flex-wrap -m-2">
                  {/* First Name */}
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label htmlFor="first-name" className="leading-7 text-sm text-gray-600">First Name</label>
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={state.form.firstName}
                        onChange={(e) => dispatch({ type: actionTypes.UPDATE_FORM_FIELD, payload: { fieldName: 'firstName', value: e.target.value } })}
                        className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  {/* Last Name */}
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label htmlFor="last-name" className="leading-7 text-sm text-gray-600">Last Name</label>
                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={state.form.lastName}
                        onChange={(e) => dispatch({ type: actionTypes.UPDATE_FORM_FIELD, payload: { fieldName: 'lastName', value: e.target.value } })}
                        className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={state.form.email}
                        onChange={(e) => {
                          const value = e.target.value;
                          dispatch({ type: actionTypes.UPDATE_FORM_FIELD, payload: { fieldName: 'email', value } });
                          if (!isValidEmail(value)) {
                            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, payload: { message: 'Email is invalid' } });
                          } else {
                            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, payload: { message: '' } });
                          }
                        }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      {state.form.errorMessage && (
                        <h2 style={{color: 'red', fontSize: '12px'}}>{state.form.errorMessage}</h2>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
                      <PhoneInput
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: true,
                        }}
                        value={state.form.phoneNumber}
                        onChange={(value) => dispatch({ type: actionTypes.UPDATE_FORM_FIELD, payload: { fieldName: 'phoneNumber', value } })}
                        country="in"
                        inputStyle={{ height: '40px', fontSize: '16px', width: '100%' }}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                      <textarea id="message" name="message" value={state.form.specialRequest} onChange={(value) => dispatch({ type: actionTypes.UPDATE_FORM_FIELD, payload: { fieldName: 'specialRequest', value: value.target.value} })} className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button onClick={Checkout} className="flex mx-auto text-white bg-orange-900 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg">Continue To Payment</button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Google map */}
          <div className="xl:w-4/5 md:w-2/3 lg:text-left lg:mx-auto w-full mt-8">
            <OPGoogleMap/>
          </div>
        </div>
      </section>
    </>
);
}
