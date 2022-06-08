import React, {useEffect, useState} from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import './App.css';
import AppContext from "./context/Context";
import axios from "axios";


function App() {
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



    const getData = async () => {
        try {
            setLoading(false)

            const [routesData , crewdata] = await Promise.all([
                axios.get("http://127.0.0.1:5000/api/createRoute"),
                axios.get("http://127.0.0.1:5000/api/crew")
            ])
            // const urlMap = "http://127.0.0.1:5000/createRoute";
            // let data = await fetch(urlMap);
            // setCoordinates(await data.json());
            setCoordinates(routesData.data)
            setCrew(crewdata.data)
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

  return (
      <div className="App">
          <AppContext.Provider value={{coordinates, setCoordinates, loading,
              setLoading, crew, setCrew, swap, setSwap,crewRoute, setCrewRoute,openDraw, setOpenDraw }}>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/map" element={<Map/>}/>
              </Routes>
          </AppContext.Provider>
      </div>
  );
}

export default App;
