import React, { useState, useRef } from "react";
import Image from "next/image";
const Circle = require("../images/red-circle-icon.svg")
import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'

export const GoogleMapComponent = () => {
    const list = {
        "Popular Restaurants": [
            ["Cafe Hendrix", "450 m", "Café Hendrix, Dispur, Rukmini Gaon, Guwahati, Assam, India"],
            ["Nuts and Brew", "650 m", "Nuts and Brew, GS Road, in front of Novotel Hotel, Rukmini Gaon, Guwahati, Assam, India"],
            ["Novotel Hotel", "650 m", "Novotel Guwahati GS Road Hotel, GS Road, Dispur, Downtown, Guwahati, Assam, India"],
            ["Greenwood Resort", "4.1 kms", "The Greenwood Resort, Guwahati, GS Road, Madhab Nagar, Khanapara, Guwahati, Assam, India"],
            ["PK's Eco Retreat", "12.9 kms", "PK's Eco Retreat, Army Cantonment, Narengi Tinali, Guwahati, Assam, India"]
        ],
        "Shopping Areas": [
            ["Westside Udeshna", "950 m", "WESTSIDE - Udeshna Building, Hari Mandir Path, Sarumotoria, Guwahati, Assam, India"],
            ["City Center", "4 kms", "City Center, GS Road, Christian Basti, Guwahati, Assam, India"],
            ["Central Mall", "4.9 kms", "Central Mall, Sree Nagar, Guwahati, Assam, India"],
            ["Soham Emporia", "6 kms", "Sohum Emporia, SATSANG VIHAR, Bhangagarh, Guwahati, Assam, India"],
            ["Fancy Bazaar", "9.6 kms", "Fancy Bazaar, Guwahati, Assam, India"]
        ],
        "Tourist Destinations": [
            ["Guwahati Zoo", "4.8 kms", "Assam State Zoo cum Botanical Garden, RG Baruah Road, Guwahati, Assam, India"],
            ["Umananda Island", "9.8 kms", "Peacock Island, Baruah Souk, North Guwahati, Guwahati, Assam"],
            ["Statue of Lachit Borphukan", "10.8 kms", "Statue of Veer Lachit Borphukan, MG Rd, North Guwahati, Guwahati, Assam 781001, India"],
            ["Kamakhya Temple", "15.6 kms", "Kamakhya Temple, Kamakhya, Guwahati, Assam, India"],
            ["Pobitora Wildlife Sanctuary", "42.7 kms", "Pobitora Wildlife Sanctuary, Morigaon, Assam, India"]
        ],
        "Essentials": [
            ["Downtown Hospital", "600 m", "down town hospital, GS Road, Bormotoria, Guwahati, Assam, India"],
            ["Police Station", "3.3 kms", "Dispur Police Station, GS Road, Dispur, Guwahati, Assam, India"],
            ["Khanapara Bus Stop", "3.7 kms", "Khanapara Bus Stop, GS Road, Khanapara, Guwahati, Assam, India"],
            ["Airport", "34.8 kms", "Guwahati Airport (GAU), Borjhar, Guwahati, Assam, India"],
        ],
    }
    
    const [restaurantColor, setRestaurantColor] = useState("red");
    const [shoppingColor, setShoppingColor] = useState("black");
    const [touristColor, setTouristColor] = useState("black");
    const [essentialColor, setEssentialColor] = useState("black");
    const nameForm = useRef<any | null>(null);

    const restaurantStyle = {
        color: restaurantColor
      };
    const shoppingStyle = {
        color: shoppingColor
    };
    const destinationStyle = {
        color: touristColor
    };
    const essentialsStyle = {
        color: essentialColor
    };

    const listChange = (name: string) => {
        setNewList(list[name as keyof typeof list])
        if(name == "Popular Restaurants"){
            setRestaurantColor("rgb(234 88 12)")
            setShoppingColor("black")
            setTouristColor("black")
            setEssentialColor("black")
        }
        else if(name == "Shopping Areas") {
            setRestaurantColor("black")
            setShoppingColor("rgb(234 88 12)")
            setTouristColor("black")
            setEssentialColor("black")
        }
        else if (name == "Tourist Destinations") {
            setRestaurantColor("black")
            setShoppingColor("black")
            setTouristColor("rgb(234 88 12)")
            setEssentialColor("black")
        }
        else if (name == "Essentials") {
            setRestaurantColor("black")
            setShoppingColor("black")
            setTouristColor("black")
            setEssentialColor("rgb(234 88 12)")
        }
    }

    const [newList, setNewList] = useState(list["Popular Restaurants"])
    const [directionsResponse, setDirectionsResponse] = useState<any | null>(null);
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [answer, setAnswer] = useState(null)
    const destiantionRef = useRef<HTMLInputElement | null>(null);

    const center = {lat: 26.141434429929365, lng: 91.80226693788448}
        const { isLoaded } = useJsApiLoader({
            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
            libraries: ['places']
        })
    
          if (!isLoaded) {
            return (<div>Loading</div>)
          }

    async function calculateRoute() {

        if (typeof destiantionRef === 'undefined' || null) {
          return
        }

        if(destiantionRef?.current?.value === '' || null){
            return 
        }
        const destination= destiantionRef.current!.value;
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: 'Cherry City Cottage, Mathura Nagar, Bormotoria, Guwahati, Assam, India',
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0]!!.legs[0]!!.distance!.text)
        setDuration(results.routes[0]!!.legs[0]!!.duration!.text)
      }

    async function calculateRouteOfPresetLocations(location: string) {

        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: 'Cherry City Cottage, Mathura Nagar, Bormotoria, Guwahati, Assam, India',
            destination: location,
            travelMode: google.maps.TravelMode.DRIVING,
          })
          setDirectionsResponse(results)
          setDistance(`Distance: ` + results.routes[0]!!.legs[0]!!.distance!.text)
          setDuration(`Duration: ` + results.routes[0]!!.legs[0]!!.duration!.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        destiantionRef['current']!['value'] = ''
      }

    return (    
        <div>
            <h1 className="md:text-3xl md:my-6 text-lg md:ml-0 ml-4 mx-auto md:text-left text-center">
                What's nearby?
            </h1>
            <hr className="md:mx-32 mx-8 mt-2 md:hidden"/>
            <div className="md:border flex flex-col">
                <div className="flex flex-col md:mx-5 md:my-5 my-2">
                    <div className="flex flex-row md:my-4">
                        <Image src={Circle} alt="circle" height={20} width={20} className="md:ml-1 md:w-5 w-0"/>
                        <p className="mx-5 font-bold text-base invisible md:visible">
                            Cherry City Cottage
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <svg fill="#000000" width="30px" height="30px" viewBox="-8 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className="md:w-auto w-0">
                            <title>map-marker</title>
                            <path d="M8.16 26.96c-0.88 0-1.64-0.4-2.040-1.080l-5.040-9c-0.68-1.16-1.080-2.52-1.080-3.92 0-4.36 3.68-7.92 8.16-7.92 4.52 0 8.16 3.56 8.16 7.92 0 1.4-0.4 2.76-1.12 3.96l-4.96 8.92c-0.44 0.72-1.2 1.12-2.080 1.12zM8.16 6.72c-3.56 0-6.48 2.8-6.48 6.24 0 1.080 0.28 2.16 0.88 3.12l5.040 8.96c0.080 0.16 0.32 0.24 0.6 0.24s0.52-0.12 0.6-0.28l5-8.92c0.56-0.96 0.88-2.040 0.88-3.12-0.040-3.44-2.92-6.24-6.52-6.24zM8.16 16.16c-1.64 0-2.96-1.36-2.96-2.96 0-1.64 1.32-2.96 2.96-2.96s2.96 1.32 2.96 2.96c0 1.6-1.32 2.96-2.96 2.96zM8.16 11.92c-0.72 0-1.28 0.56-1.28 1.28s0.56 1.28 1.28 1.28 1.28-0.56 1.28-1.28-0.56-1.28-1.28-1.28z"></path>
                        </svg>
                        <Autocomplete>
                            <input type="text" name= "destination" className="bg-gray-50 border border-gray-300 md:text-sm text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block md:w-80 mx-4 p-2.5 dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Find distance from Cherry City Cottage" ref={destiantionRef}/>
                        </Autocomplete>
                            <button type='submit' onClick={calculateRoute} className="text-white bg-orange-900 border-0 focus:outline-none rounded-lg hover:bg-neutral-800 text-base font-medium md:mx-auto md:px-5 px-2 py-1 text-center ml-auto mr-3 md:mr-0">
                                <p className="md:text-base text-xs">Calculate Route</p>
                            </button>
                    </div>
                    <div className="flex flex-row my-4">
                        <div className="flex flex-row my-4">
                            {distance}
                        </div>
                        <div className="flex flex-row my-4 mx-6">
                            {duration}
                        </div>
                        <div className="flex flex-row mx-auto mr-4">
                            <button type="button" onClick={clearRoute} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="md:mx-5 flex flex-col">
                    <div className="md:space-x-4 flex">
                        <button onClick={() => listChange("Popular Restaurants")} className="text-xs md:text-lg md:font-semibold flex-1 md:flex-none">
                            <p style={restaurantStyle}>Restaurants</p>
                        </button>
                        <button onClick={() => listChange("Shopping Areas")} className="text-xs md:text-lg md:font-semibold flex-1 md:flex-none">
                            <p style={shoppingStyle}>Shopping</p>
                        </button>
                        <button onClick={() => listChange("Tourist Destinations")} className="text-xs md:text-lg md:font-semibold flex-1 md:flex-none">
                            <p style={destinationStyle}>Destinations</p>
                        </button>
                        <button onClick={() => listChange("Essentials")} className="text-xs md:text-lg md:font-semibold flex-1 md:flex-none">
                            <p style={essentialsStyle}>Essentials</p>
                        </button>
                    </div>
                    <hr className="mt-3"/>
                    <div className="flex md:flex-row flex-col w-full md:my-5 my-1">
                        <div className="flex flex-row w-full md:mr-4">
                            <div className="flex flex-col items-end w-full mx-4">
                                <>{ newList && newList.map((element, index) => {
                                    return <li key={index} className="list-none font-medium w-full md:my-5 my-2 md:text-sm text-xs">
                                                {element[0]}
                                            </li>
                                })
                                }</>
                            </div>
                            <div className="flex flex-col items-end w-full mx-4">
                                <>{newList && newList.map((element, index) => {
                                    return <li key={index} className="list-none md:my-5 md:text-sm my-2 text-xs text-slate-400">
                                                <button onClick={() => calculateRouteOfPresetLocations(element[2] as string)}>
                                                    {element[1]}
                                                </button>
                                            </li>
                                })}
                                </>
                            </div>
                        </div>
                        <div className= "flex flex-row w-full mr-4">
                            <GoogleMap 
                                center={center} 
                                zoom={15} 
                                mapContainerStyle={{width: '420px', height: '450px'}}
                                options={{
                                    streetViewControl: false,
                                    mapTypeControl: false,
                                    fullscreenControl: false,
                                }}
                                >
                                { isLoaded && <MarkerF position={{ lat: center.lat, lng: center.lng }} />}
                                <DirectionsRenderer directions={directionsResponse}/>
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default GoogleMapComponent