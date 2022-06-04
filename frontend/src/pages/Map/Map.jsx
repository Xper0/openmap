import React, {useEffect, useState} from 'react';
import "./map.scss";
import {MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON, useMapEvents, Polyline,  } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Header from "../../components/Header/Header";
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import road from "../../assets/roades.json";
import PathFinder  from "geojson-path-finder"
import point from "turf-point";
import explode from "@turf/explode";
import nearestPoint from "@turf/nearest-point";
import car1 from "../../assets/img/car3.png";
import carImg from "../../assets/img/number.png";
import L from "leaflet";
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';



const Map = () => {
    const [coordinates, setCoordinates] = useState([]);
    const [markerCar, setMarkerCar] = useState([])
    const [loading, setLoading] = useState(false)
    const [position, setPosition] = useState(null)
    const [markers, setMarker] = useState([]);
    const [polyline, setPolyline] = useState([]);
    const [routeValue, setRouteValue] = useState("")
    const pointsReroute = explode(road);
    console.log(pointsReroute)
    const  MyComponent = () => {
        const map = useMapEvents({
            click(e) {
                map.locate()
                let latlng = e.latlng
                console.log(latlng)
                let arrlatlng = [latlng.lat, latlng.lng]
                setMarker(prev => [...prev, arrlatlng ])
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
    console.log(markers)
    const createAutoRoute = async () => {
      if (markers.length >= 2) {
          markers.map( arr => arr.reverse());
          let rec = (array) => array.reduce( (acc, val) =>  Array.isArray(val) ? acc.concat(rec(val)): acc.concat(val),[])
          let res = rec(markers)
          let newArr = res.map((pos,index) => index % 2 === 1 ? `${pos.toString().substr(0, 9)};` : pos.toString().substr(0,9) + ",")
          let coords = newArr.join("").slice(0, -1);
          let urlPosition = `https://router.project-osrm.org/route/v1/car/${coords}?steps=true&overview=simplified&geometries=geojson`;
          let data = await fetch(urlPosition);
          let coodinates = await data.json();
          let getRoutes = coodinates.routes[0].geometry.coordinates;
          getRoutes.map( item => {
              item.reverse()
          });
          setPolyline(getRoutes)
      }else{
          window.alert("Недостаточно точек для построения маршрута")
      }
    }
    const clearMap =  () => {
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
    const getData = async () => {
        try {
            setLoading(false)
            const urlMap = "http://127.0.0.1:5000/createRoute";
            let data = await fetch(urlMap);
            setCoordinates(await data.json());
            setLoading(true)
            // setRoutes(await data.json())
        }
        catch (err){
            console.log("Запрос не выполнен")
        }

        // let result = await data.json();
    }
    const handleChange = (e) =>{
        let selected = e.target.value;
        let marker = [selected[0], selected[selected.length - 1]]
        setPolyline(selected)
        setMarker(marker)
    }

    useEffect(() => {
        getData()
    },[])
    console.log(pointsReroute)
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
    const [visible,setVisible] = useState(false)


    const styles = {fontSize: 32, fontWeight: 'bold', margin: 20, cursor: 'pointer', float: 'left'};
    return (
        <div>
            <Header/>
            <div className="Map-container">
                <div className="Map-option">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Выбор маршрута</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Выбор маршрута"
                            onChange={handleChange}
                        >
                            {loading && coordinates.result.map((route,i) =>
                                    <MenuItem value={route.coordinates} key={i}>{route.titleRoute}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Выбор водителя</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Выбор водителя"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <button onClick={() => showPath()} >Расчет</button>
                    <button onClick={() => createAutoRoute()} >Построить маршрут</button>
                    <button onClick={()=> clearMap()}>Очистить карту</button>


                    <div>
                        <h2>Demo: Drag in the directions indicated</h2>
                        <DragDropContainer xOnly={true}><div style={styles}>↔</div></DragDropContainer>
                        <DragDropContainer yOnly={true}><div style={styles}>↕</div></DragDropContainer>
                        <DragDropContainer><img style={styles} src="img/4-way-arrow.png" width="24"/></DragDropContainer>
                        <textarea disabled value="<DragDropContainer xOnly={true}>[drag left and right]</DragDropContainer>" />
                        <textarea disabled value="<DragDropContainer yOnly={true}>[drag up and down]</DragDropContainer>" />
                        <textarea disabled value="<DragDropContainer>[drag anywhere]</DragDropContainer>" />
                    </div>



                </div>
                <div className="Map">
                    <MapContainer
                        center={[58.2300, 103.0187]}
                        zoom={9}
                        scrollWheelZoom={true}
                        style={{height: "100%", width: "100%"}}

                    >
                        {coordinates &&
                            <GeoJSON  data={road} pathOptions={{ color: 'blue' }} />
                        }

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MyComponent />
                        {markers.length !== 0 && markers.map((marker,index) =>
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
                        {polyline.length !==0 && <Polyline positions={polyline} color="red" />}
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