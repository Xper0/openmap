import React, {useEffect, useRef, useState} from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import './App.css';
import AppContext from "./context/Context";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import {setInitData} from "../src/redux/features/dragdropSlice";
import {setFlightRoute} from "../src/redux/features/mapSlice";
import { socket } from "./socket";

function App() {
    const dispatch = useDispatch();
    // const socket = useRef()



    // const flightRoute = useSelector( state => state.mapSlice)

    const [openDraw, setOpenDraw] = useState(true)
    const [coordinates, setCoordinates] = useState([]);
    // const [markerCar, setMarkerCar] = useState([])
    const [loading, setLoading] = useState(false)
    // const [position, setPosition] = useState(null)
    // const [markers, setMarker] = useState([]);
    // const [polyline, setPolyline] = useState([]);
    // const [routeValue, setRouteValue] = useState("")
    const [crew, setCrew] = useState([])
    const [swap, setSwap] = useState([])
    const [crewRoute, setCrewRoute] = useState([])
    const [flightRouter, setFlightRouter] = useState([])
    // const [activePage, setActivePage] = useState(true)
    const [routeDrop, setRouteDrop] =useState([])
    const [crewDrop, setCrewDrop] = useState([])
    const [shipment, setShipment] = useState([])
    const [fetching, setFetching] = useState(false)
    const { flightRoute } = useSelector( state => state.mapSlice)


    // const [flightRoute, setFlightRoute] = useState([])
    // const [routeBox, setRouteBox] = useState(coordinates.result)
    // const [crewBox, setCrewBox] = useState(crew.message)
    // const [flightRouteBox, setFlightRouteBox] = useState([])
    // const [flightCrewBox, setFlightCrewBox] = useState([])
    // const [boxes, setBoxes]= useState({})
    // const dispatch = useDispatch();
    // console.dir(dispatch)
    // let testRedux = useSelector( (state) => state)

    const getData = async () => {
        try {
            setLoading(false)
            const [routesData , crewdata, flightdata,shipmentData, flightData ] = await Promise.all([
                axios.get("http://127.0.0.1:5000/api/createRoute"),
                axios.get("http://127.0.0.1:5000/api/crew"),
                axios.get("http://127.0.0.1:5000/api/flightRouter"),
                axios.get("http://127.0.0.1:5000/api/shipment"),
                axios.get("http://127.0.0.1:5000/api/flightRouter"),

            ])
            // const urlMap = "http://127.0.0.1:5000/createRoute";
            // let data = await fetch(urlMap);
            // setCoordinates(await data.json());
            setCoordinates(routesData.data)
            setCrew(crewdata.data)
            setFlightRouter(flightdata.data.message)
            setShipment(shipmentData.data)
            dispatch(setInitData({
                routeBox: routesData.data.result,
                crewBox: crewdata.data.message,
                shipmentBox: shipmentData.data.message,
                flightRouteBox: [],
                flightCrewBox: [],
                flightShipment: []
            }))
            dispatch(setFlightRoute(flightData.data.message))
            // socket.current.send(JSON.stringify({
            //     flightData
            // }))
            setLoading(true)
            // setRoutes(await data.json())
        }
        catch (err){
            console.log("Запрос не выполнен")
        }

        // let result = await data.json();
    }

    useEffect(() => {
        getData()
    },[])
    socket.onopen = (msg) => {
        // console.log(msg)
        // if (loading){
        //     socket.send(JSON.stringify(
        //         flightRouter
        //     ))
        // }

    }

    useEffect(() => {
       // socket = new WebSocket("ws://127.0.0.1:7000");
       //  console.log("server ON")
        if (loading){
            console.log("server ON")
        // socket.onopen = (msg) => {
        //         console.log(msg)
        //     if (loading){
        //         socket.send(JSON.stringify(
        //             flightRouter
        //         ))
        //     }
        //
        // }
        }
        socket.onmessage = (response) => {
            console.log(response)
            let oMessage = JSON.parse(response.data)
            console.dir(oMessage)
        }

    },[loading])

    // useEffect(() => {
    //     (async () => {
    //         if (fetching) {
    //             const [flightData ] = await Promise.all([
    //                 axios.get("http://127.0.0.1:5000/api/flightRouter"),
    //             ])
    //             dispatch(setFlightRoute(flightData.data.message))
    //             setFetching(false)
    //         }
    //     } )()
    // },[flightRoute])

  return (
      <div className="App">
          <AppContext.Provider value={{coordinates, setCoordinates, loading,
              setLoading, crew, setCrew, swap, setSwap,crewRoute, setCrewRoute,openDraw, setOpenDraw,
              flightRouter, setFlightRouter,  routeDrop, setRouteDrop,
              crewDrop, setCrewDrop,fetching, setFetching
          }}>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/map" element={<Map/>}/>
              </Routes>
          </AppContext.Provider>
      </div>
  );
}

export default App;
