import React, {useEffect, useState, useContext} from 'react';
import "./map.scss";
import {MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON, useMapEvents, Polyline} from 'react-leaflet';
// import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Header from "../../components/Header/Header";
import {FormControl, InputLabel, Select, MenuItem, List} from "@mui/material";
import road from "../../assets/roades.json";
import PathFinder from "geojson-path-finder"
import point from "turf-point";
import explode from "@turf/explode";
import nearestPoint from "@turf/nearest-point";
import car1 from "../../assets/img/car3.png";
import carImg from "../../assets/img/number.png";
import L from "leaflet";
import {DragDropContainer, DropTarget} from 'react-drag-drop-container';
import Box from "../../components/Box/Box";
import BoxItem from "../../components/BoxItem/BoxItem";
import axios from "axios";
import AppContext from "../../context/Context";
import Sidebar from "../../components/SideBar/SideBar";
import FlightRouter from "../../components/FlightRouter/FlightRouter";
import Crew from "../../components/Crew/Crew";


const Map = () => {
    const {coordinates, setCoordinates, loading, setLoading, crew, setCrew} = useContext(AppContext)
    const [activePage, setActivePage] = useState(false)
    // const [coordinates, setCoordinates] = useState([]);
    const [markerCar, setMarkerCar] = useState([])
    // const [loading, setLoading] = useState(false)
    const [position, setPosition] = useState(null)
    const [markers, setMarker] = useState([]);
    const [polyline, setPolyline] = useState([]);
    const [routeValue, setRouteValue] = useState("")
    // const [crew, setCrew] = useState([])
    const pointsReroute = explode(road);
    const MyComponent = () => {
        const map = useMapEvents({
            click(e) {
                map.locate()
                let latlng = e.latlng
                console.log(latlng)
                let arrlatlng = [latlng.lat, latlng.lng]
                setMarker(prev => [...prev, arrlatlng])
                // setMarker([latlng.lat, latlng.lng])
            },
            locationfound(e) {
                setPosition(e.latlng)
                // map.flyTo(e.latlng, map.getZoom())
            },

        })
    }


    const showPath = () => {
        var pointList = [];
        console.log(road)
        for (let i = 1; i < markers.length; i++) {
            let start = point(markers[i - 1].reverse());
            let end = point(markers[i].reverse());

            let startInNetwork = nearestPoint(start, pointsReroute);
            let endInNetwork = nearestPoint(end, pointsReroute);

            let pathFinder = new PathFinder(road);

            let path = pathFinder.findPath(startInNetwork, endInNetwork);
            // console.log(path)
            // path.path.map( (item,index,array) => {
            //     item.reverse()
            // });
            let pathes = path.path.map(item => item.reverse())

            setPolyline(path.path)
            setMarkerCar(path.path)

            // setPolyline(pointList)
            // console.log(pointList);
        }

        // let test =  pointsReroute.features.filter( geometry => console.log(geometry.geometry.coordinates[102.8744183537535, 57.9010197408066]))
        // let start = road.features.filter( geometry => geometry.geometry.coordinates.includes(markers[0].reverse()))
        // let finish = road.features.filter( geometry => geometry.geometry.coordinates.includes(markers[1].reverse()))
        // console.log(start)
        // console.log(finish)
        // let path = pathFinder.findPath(start, finish);
        // console.log(path)
    }

    const createAutoRoute = async () => {
        if (markers.length >= 2) {
            markers.map(arr => arr.reverse());
            let rec = (array) => array.reduce((acc, val) => Array.isArray(val) ? acc.concat(rec(val)) : acc.concat(val), [])
            let res = rec(markers)
            let newArr = res.map((pos, index) => index % 2 === 1 ? `${pos.toString().substr(0, 9)};` : pos.toString().substr(0, 9) + ",")
            let coords = newArr.join("").slice(0, -1);
            let urlPosition = `https://router.project-osrm.org/route/v1/car/${coords}?steps=true&overview=simplified&geometries=geojson`;
            let data = await fetch(urlPosition);
            let coodinates = await data.json();
            let getRoutes = coodinates.routes[0].geometry.coordinates;
            getRoutes.map(item => {
                item.reverse()
            });
            setPolyline(getRoutes)
        } else {
            window.alert("Недостаточно точек для построения маршрута")
        }
    }
    const clearMap = () => {
        setMarker([])
        setPolyline([])
    }
    //
    // const start = {
    //     type: "Feature",
    //     geometry: {
    //         type: "Point",
    //         coordinates: [103.1531156497511, 58.0659995538515],
    //     },
    // };
    //
    // const finish = {
    //     type: "Feature",
    //     geometry: {
    //         type: "Point",
    //         coordinates: [103.150583864657, 58.0993102528147],
    //     },
    // }
    // // const path = pathFinder.findPath(start, finish);
    // console.log(pathFinder)
    // const getData = async () => {
    //     try {
    //         setLoading(false)
    //
    //         const [routesData , crewdata] = await Promise.all([
    //             axios.get("http://127.0.0.1:5000/api/createRoute"),
    //             axios.get("http://127.0.0.1:5000/api/crew")
    //         ])
    //
    //         // const urlMap = "http://127.0.0.1:5000/createRoute";
    //         // let data = await fetch(urlMap);
    //         // setCoordinates(await data.json());
    //         setCoordinates(routesData.data)
    //         setCrew(crewdata.data)
    //         setLoading(true)
    //         // setRoutes(await data.json())
    //     }
    //     catch (err){
    //         console.log("Запрос не выполнен")
    //     }
    //
    //     // let result = await data.json();
    // }
    const handleChange = (e) => {
        let selected = e.target.value;
        let marker = [selected[0], selected[selected.length - 1]]
        setPolyline(selected)
        setMarker(marker)
    }

    // useEffect(() => {
    //     getData()
    // },[])

    var myIcon = L.icon({
        className: "car__icon",
        iconUrl: car1,
        // iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [50, 50],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'my-icon-shadow.png',
        // shadowRetinaUrl: 'my-icon-shadow@2x.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
    const [visible, setVisible] = useState(false)


    const styles = {fontSize: 32, fontWeight: 'bold', margin: 20, cursor: 'pointer', float: 'left'};
    const list = [1, 2, 3, 4]
    return (
        <div className="Map-container">
            <div>
                <Header/>
            </div>
            <div className="Map-content">
                <Sidebar
                    children={activePage ? <FlightRouter/> : <Crew/>}
                />
                {/*<div className="Map-option">*/}

                {/*    <button onClick={() => showPath()} >Расчет</button>*/}
                {/*    <button onClick={() => createAutoRoute()} >Построить маршрут</button>*/}
                {/*    <button onClick={()=> clearMap()}>Очистить карту</button>*/}
                {/*    <div className="drag_things_to_boxes">*/}

                {/*        {coordinates.result && <Box id="board-1" className="box">*/}
                {/*            {coordinates.result.map((item,index) =>*/}
                {/*                <BoxItem key={index} id={item.titleRoute}   className="BoxItem">*/}
                {/*                    <div draggable="true" id={item.titleRoute}>*/}
                {/*                        <h3>{item.titleRoute}</h3>*/}
                {/*                    </div>*/}
                {/*                </BoxItem>*/}
                {/*            )}*/}
                {/*        </Box>}*/}
                {/*        <div className="drag-result">*/}
                {/*            <div className="drag-container">*/}
                {/*                <div className="header">*/}
                {/*                    <h2>Рейс</h2>*/}
                {/*                </div>*/}
                {/*                <div className="content">*/}
                {/*                    <div className="content_router">*/}
                {/*                        <h5>Маршрут</h5>*/}
                {/*                        <Box className="box_router">*/}
                {/*                        </Box>*/}
                {/*                    </div>*/}
                {/*                    <div className="content_crew">*/}
                {/*                        <h5>Экипаж</h5>*/}
                {/*                        <Box className="box_crew">*/}
                {/*                        </Box>*/}
                {/*                    </div>*/}

                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        {crew.message && <Box id="board-2" className="box">*/}
                {/*            {crew.message.map((item,index) =>*/}
                {/*            item.drivers.length !== 0 ?*/}
                {/*                <BoxItem key={index} id={item.vehicle.license_number} datalist={item}  className="BoxItem outer highlighted item grabber">*/}
                {/*                    {item.drivers.map((driver, index) =>*/}
                {/*                        <div key={index}  className="BoxDrag" draggable="true" id={item.vehicle.license_number}>*/}

                {/*                            <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>*/}
                {/*                            <span>{driver.job_position}</span>*/}
                {/*                            <span>{item.vehicle.license_number}</span>*/}
                {/*                            <span>{item.vehicle.type_vehicle}</span>*/}
                {/*                            <span>{item.vehicle.wear_vehicle}</span>*/}

                {/*                        </div>)*/}
                {/*                    }*/}
                {/*                </BoxItem>*/}
                {/*                : null*/}
                {/*            )}*/}
                {/*        </Box>}*/}


                {/*        /!*{(coordinates.result && crew.message) && <div className="boxes">*!/*/}
                {/*        /!*    <Box datalist={coordinates.result}/>*!/*/}
                {/*        /!*    <Box datalist={crew.message}/>*!/*/}
                {/*        /!*</div>*!/*/}
                {/*        /!*}*!/*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <button>Сохранить</button>*/}
                {/*    </div>*/}

                {/*</div>*/}
                <div className="Map">
                    <MapContainer
                        center={[58.2300, 100.0187]}

                        zoom={8}
                        scrollWheelZoom={true}
                        style={{height: "100%", width: "100%"}}

                    >


                        {coordinates &&
                            <GeoJSON data={road} pathOptions={{color: 'blue'}}/>
                        }

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MyComponent/>
                        {markers.length !== 0 && markers.map((marker, index) =>
                            <Marker
                                key={index}
                                position={marker}
                                draggable={true}
                                eventHandlers={{
                                    click: () => {
                                        console.log('marker clicked')
                                    },
                                }}
                            >
                                <Popup>First marker
                                    <button>Удалить</button>
                                </Popup>

                            </Marker>
                        )}
                        {markerCar.length !== 0 &&
                            <Marker
                                position={markerCar[0]}
                                draggable={true}
                                icon={myIcon}
                                eventHandlers={{
                                    mouseover: (e) => {
                                        e.target.openPopup()
                                    },
                                    mouseout: (e) => {
                                        e.target.closePopup()
                                    }
                                }}
                            >
                                <Popup closeOnClick={visible}>
                                    <div className="popup-info">
                                        <div className="popup-info__car">
                                            <span><b>Машина:</b> Ford Mustang</span>
                                            <span><b>Цвет:</b> Черный</span>
                                            <span><b>Номер:</b> C430XE</span>
                                            <img src={carImg} alt="car"/>
                                        </div>
                                        <div className="popup-info__driver">
                                            <span><b>Водитель:</b> Евпатий О.В.</span>
                                        </div>
                                    </div>
                                    {/*<button>Удалить</button>*/}
                                </Popup>
                            </Marker>
                        }
                        {/*{markerCar.length !== 0 && markerCar.map((marker,index) =>*/}
                        {/*    <Marker*/}
                        {/*        key={index}*/}
                        {/*        position={marker}*/}
                        {/*        draggable={true}*/}
                        {/*        // icon={car1}*/}
                        {/*        eventHandlers={{*/}
                        {/*            click: () => {*/}
                        {/*                console.log('marker clicked')*/}
                        {/*            },*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <Popup>*/}
                        {/*            <div>*/}
                        {/*                <h1>Машина: FordMustang</h1>*/}
                        {/*                <span>Цвет: Зеленый</span>*/}
                        {/*            </div>*/}
                        {/*            <button>Удалить</button>*/}
                        {/*        </Popup>*/}

                        {/*    </Marker>*/}
                        {/*)}*/}
                        {/*{polyline.map( (poly,index) => {*/}
                        {/*    <Polyline*/}
                        {/*        key={index}*/}
                        {/*        positions={[poly]}*/}
                        {/*        pathOptions={{ color: 'red' }}*/}
                        {/*    >*/}

                        {/*    </Polyline>*/}
                        {/*})}*/}
                        {polyline.length !== 0 && <Polyline positions={polyline} color="red"/>}
                        {/*<Polyline positions={pos} color="red" />*/}

                        {/*<Marker position={[40.8054, -74.0241]} draggable={true}>*/}
                        {/*    <Popup>Hey ! I live here</Popup>*/}
                        {/*</Marker>*/}
                    </MapContainer>

                </div>
            </div>
        </div>
    );
};

export default Map;