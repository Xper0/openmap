import React, {useContext, useEffect, useState} from 'react';
import Box from "../Box/Box";
import BoxItem from "../BoxItem/BoxItem";
import AppContext from "../../context/Context";
import "./crew.scss";
import { useSelector, useDispatch } from 'react-redux'
import {setInitData} from "../../redux/features/dragdropSlice";
import MapIcon from '@mui/icons-material/Map';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import road from "../../assets/roades.json";
import point from "turf-point";
import nearestPoint from "@turf/nearest-point";
import PathFinder from "geojson-path-finder";
import axios from "axios";
import {Button} from "@mui/material";
import {setFlightRoute} from "../../redux/features/mapSlice";
import {socket} from "../../socket";
import FlightRouter from "../FlightRouter/FlightRouter";

const Crew = () => {
    const {setFetching,setFlightCrewBoxrouteDrop, setRouteDrop,crewDrop, setCrewDrop,activePage, setActivePage,coordinates, setCoordinates, loading, setLoading, crew, setCrew}  = useContext(AppContext)
    const dispatch = useDispatch();
    let boxData = useSelector( (state) => state.dragdropSlice.initData)
    const copyBoxDta = JSON.parse(JSON.stringify(boxData))
    // dispatch(setInitData({
    //     routeBox: coordinates.result,
    //     crewBox: crew.message,
    //     flightRouteBox: [],
    //     flightCrewBox: []
    // }))
    // const load = () => {
    //     dispatch(setInitData({
    //         routeBox: coordinates.result,
    //         crewBox: crew.message,
    //         flightRouteBox: [],
    //         flightCrewBox: []
    //     }))
    // }
    // useEffect(() => {
    //     load()
    // }, [])

    // const [routeDrop, setRouteDrop] =useState([])
    // const [crewDrop, setCrewDrop] = useState([])
    // const showPath = () => {
    //     var pointList = [];
    //     console.log(road)
    //     for (let i = 1; i < markers.length; i++) {
    //         let start = point(markers[i - 1].reverse());
    //         let end = point(markers[i].reverse());
    //
    //         let startInNetwork = nearestPoint(start, pointsReroute);
    //         let endInNetwork = nearestPoint(end, pointsReroute);
    //
    //         let pathFinder = new PathFinder(road);
    //
    //         let path = pathFinder.findPath(startInNetwork, endInNetwork);
    //         // console.log(path)
    //         // path.path.map( (item,index,array) => {
    //         //     item.reverse()
    //         // });
    //         let pathes = path.path.map(item => item.reverse())
    //
    //         setPolyline(path.path)
    //         setMarkerCar(path.path)
    //
    //         // setPolyline(pointList)
    //         // console.log(pointList);
    //     }
    //
    //     // let test =  pointsReroute.features.filter( geometry => console.log(geometry.geometry.coordinates[102.8744183537535, 57.9010197408066]))
    //     // let start = road.features.filter( geometry => geometry.geometry.coordinates.includes(markers[0].reverse()))
    //     // let finish = road.features.filter( geometry => geometry.geometry.coordinates.includes(markers[1].reverse()))
    //     // console.log(start)
    //     // console.log(finish)
    //     // let path = pathFinder.findPath(start, finish);
    //     // console.log(path)
    // }

    // const createAutoRoute = async () => {
    //     if (markers.length >= 2) {
    //         markers.map( arr => arr.reverse());
    //         let rec = (array) => array.reduce( (acc, val) =>  Array.isArray(val) ? acc.concat(rec(val)): acc.concat(val),[])
    //         let res = rec(markers)
    //         let newArr = res.map((pos,index) => index % 2 === 1 ? `${pos.toString().substr(0, 9)};` : pos.toString().substr(0,9) + ",")
    //         let coords = newArr.join("").slice(0, -1);
    //         let urlPosition = `https://router.project-osrm.org/route/v1/car/${coords}?steps=true&overview=simplified&geometries=geojson`;
    //         let data = await fetch(urlPosition);
    //         let coodinates = await data.json();
    //         let getRoutes = coodinates.routes[0].geometry.coordinates;
    //         getRoutes.map( item => {
    //             item.reverse()
    //         });
    //         setPolyline(getRoutes)
    //     }else{
    //         window.alert("Недостаточно точек для построения маршрута")
    //     }
    // }
    // const clearMap =  () => {
    //     setMarker([])
    //     setPolyline([])
    // }


    const [routeBox, setRouteBox] = useState(coordinates.result)
    const [crewBox, setCrewBox] = useState(crew.message)
    const [flightRouteBox, setFlightRouteBox] = useState([])
    const [flightCrewBox, setFlightCrewBox] = useState([])
    const [boxes, setBoxes]= useState({
        routeBox,
        crewBox,
        flightRouteBox,
        flightCrewBox
    })


    const saveData = async () => {
      if((boxData.flightCrewBox.length && boxData.flightRouteBox.length) !== 0){
         let obj = {
             router: boxData.flightRouteBox[0]._id,
             drivers: boxData.flightCrewBox[0]._id,
             date: new Date(),
             // shipment: boxData.flightShipment[0]._id
         }
          const {data} = await axios.post("http://127.0.0.1:5000/api/flightRouter", obj)
          console.log(data.message)
          setFetching(true)
          if (data.message === "Рейс добавлен") {
              socket.send(JSON.stringify({
                  method: "addFlightRoute",
                  driverId: boxData.flightCrewBox[0]._id
              }))
              dispatch(setInitData({
                  routeBox: [...boxData.routeBox],
                  crewBox: [...boxData.crewBox],
                  flightRouteBox: [],
                  flightCrewBox: []
              }))
          }
          window.alert("Новый рейс создан")
      }
      else {
          window.alert("Не все поля заполнены!")
      }
    }
    const clearDragBox = () => {
        dispatch(setInitData({
            routeBox: [...boxData.routeBox, ...boxData.flightRouteBox],
            crewBox: [...boxData.crewBox, ...boxData.flightCrewBox],
            flightRouteBox: [],
            flightCrewBox: []
        }))
    }
    console.log(boxData.flightRouteBox)

    return (
        <div className="Crew">
            {/*<div className="Active-route">*/}
            {/*    /!*<h1>Активные маршруты</h1>*!/*/}
            {/*    <FlightRouter />*/}
            {/*</div>*/}
            {/*<div className="Map-option">*/}
                {/*<button onClick={() => showPath()} >Расчет</button>*/}
                {/*<button onClick={() => createAutoRoute()} >Построить маршрут</button>*/}
                {/*<button onClick={()=> clearMap()}>Очистить карту</button>*/}
                {/*<button onClick={() => load()}>Загрузить данные</button>*/}
            <div className="Crew-header">
                <h1>Конструктор рейсов</h1>
            </div>
                <div className="drag_things_to_boxes">

                    <Box className="box" id="routeBox" title={"Маршруты"}>
                            {boxData.routeBox && boxData.routeBox.map((routeItem,i) =>
                                <BoxItem
                                    key={i}
                                    className="BoxItem"
                                    id={"routeBox"}
                                    item={routeItem}
                                >
                                    <div className="BoxItem_shipment">
                                        <li>
                                            <label>Маршрут:</label>
                                            <span>{routeItem.titleRoute}</span>
                                        </li>
                                        <li>
                                            <label>Груз:</label>
                                            <span>{routeItem.shipment.shipment[0].name}</span>
                                        </li>
                                       <li>
                                           <label>Вес:</label>
                                           <span>{routeItem.shipment.shipment[0].weight}</span>
                                       </li>
                                    </div>
                                </BoxItem>
                            )}
                    </Box>
                    {/*<Box className="box" id="shipmentBox" title={"Груз"}>*/}
                    {/*    {boxData.shipmentBox && boxData.shipmentBox.map((shipmentItem,i) =>*/}
                    {/*        <BoxItem*/}
                    {/*            key={shipmentItem._id}*/}
                    {/*            className="BoxItem"*/}
                    {/*            id={"shipmentBox"}*/}
                    {/*            item={shipmentItem}*/}
                    {/*        >*/}
                    {/*            {shipmentItem.shipment.map( (ship,i) =>*/}
                    {/*                <div key={i} className="BoxDrag" >*/}
                    {/*                    <h3>{ship.name}</h3>*/}
                    {/*                    <span>{ship.weight}</span>*/}
                    {/*                    {ship.producer &&*/}
                    {/*                        <span>{ship.producer}</span>*/}
                    {/*                    }*/}
                    {/*                </div>*/}
                    {/*            )}*/}
                    {/*        </BoxItem>*/}
                    {/*    )}*/}
                    {/*</Box>*/}

                    <div className="drag-result">
                        <div className="drag-container">
                            <div className="header">
                                <h3>Рейс</h3>
                            </div>
                            <div className="content">
                                <div className="content_router">
                                    {/*<h5>Маршрут</h5>*/}
                                    <Box id="flightRouteBox" className="box_router">
                                        {/*{boxData.flightRouteBox}*/}
                                        {boxData.flightRouteBox.length === 0 ?
                                            <div className="box-router_preload">
                                                <MapIcon fontSize="large" color="action"/>
                                                <h2 className="box-router_title">Перетащите маршрут</h2>
                                            </div> :
                                            (
                                                boxData.flightRouteBox && boxData.flightRouteBox.map((routeItem, i) =>
                                                    <BoxItem
                                                        key={i}
                                                        className="BoxItem"
                                                        id={"flightRouteBox"}
                                                        item={routeItem}
                                                    >


                                                                <label>Маршрут:</label>
                                                                <span>{routeItem.titleRoute}</span>

                                                                <label>Груз:</label>
                                                                <span>{routeItem.shipment.shipment[0].name}</span>

                                                                <label>Вес:</label>
                                                                <span>{routeItem.shipment.shipment[0].weight}</span>


                                                    </BoxItem>
                                                )
                                            )
                                        }
                                    </Box>
                                </div>
                                <div className="content_crew">
                                    {/*<h5>Экипаж</h5>*/}
                                    <Box id="flightCrewBox" className="box_crew">
                                        {/*{boxData.flightCrewBox}*/}


                                        {boxData.flightCrewBox.length === 0 ?
                                            <div className="box-router_preload">
                                                <DirectionsCarIcon fontSize="large" color="action"/>
                                                <PersonAddIcon fontSize="large" color="action"/>
                                                <h2 className="box-router_title">Перетащите экипаж</h2>
                                            </div> :
                                            (boxData.flightCrewBox && boxData.flightCrewBox
                                                    .map((crewItem, i) => crewItem.drivers.length !== 0 ?
                                                    <BoxItem
                                                        key={i}
                                                        className="BoxItem"
                                                        id={"flightCrewBox"}
                                                        item={crewItem}
                                                    >
                                                        {crewItem.drivers.map((driver) =>
                                                            <div key={driver.firstName} className="BoxDrag">
                                                                <h3>ФИО: {`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>
                                                                <span>Должность: {driver.job_position}</span>
                                                                <span>Гос.номер: {crewItem.vehicle.license_number}</span>
                                                                <span>Тип: {crewItem.vehicle.type_vehicle}</span>
                                                                <span>Износ: {crewItem.vehicle.wear_vehicle}</span>
                                                                    <span>Макс. вес:</span>
                                                                    <span>{crewItem.vehicle.max_shipment}кг</span>

                                                            </div>)

                                                        }
                                                    </BoxItem> : null
                                                )
                                            )
                                        }
                                    </Box>
                                </div>
                                {/*<div className="content_router">*/}
                                {/*    <h5>Груз</h5>*/}
                                {/*    <Box id="flightShipment" className="box_router">*/}
                                {/*        /!*{boxData.flightRouteBox}*!/*/}
                                {/*        {boxData.flightShipment && boxData.flightShipment.map((shipmentItem,i) =>*/}
                                {/*            <BoxItem*/}
                                {/*                key={i}*/}
                                {/*                className="BoxItem"*/}
                                {/*                id={"flightShipment"}*/}
                                {/*                item={shipmentItem}*/}
                                {/*            >*/}
                                {/*                {shipmentItem.shipment.map( (ship,i) =>*/}
                                {/*                    <div key={i} className="BoxDrag" >*/}
                                {/*                        <h3>{ship.name}</h3>*/}
                                {/*                        <span>{ship.weight}</span>*/}
                                {/*                        {ship.producer &&*/}
                                {/*                            <span>{ship.producer}</span>*/}
                                {/*                        }*/}
                                {/*                    </div>*/}
                                {/*                )}*/}
                                {/*            </BoxItem>*/}
                                {/*        )}*/}
                                {/*    </Box>*/}
                                {/*</div>*/}

                            </div>
                        </div>
                    </div>
                    <Box
                        className={boxData.flightRouteBox.length !==0 ? "box" : "box noDrop"}
                        id="crewBox"
                        title={"Экипаж"}
                    >
                        {boxData.crewBox && boxData.crewBox
                            .filter(item => boxData.flightRouteBox.length !==0 ? item.vehicle.max_shipment >= (boxData.flightRouteBox[0].shipment.shipment[0].weight).replace(/[^0-9\-\.]/g, '') : item
                            )
                            .map((crewItem,i) => crewItem.drivers.length !== 0 ?
                            <BoxItem
                                key={i}
                                className={boxData.flightRouteBox.length !==0 ? "BoxItem": "BoxItem disabledbutton"}
                                id={"crewBox"}
                                item={crewItem}
                            >
                                {crewItem.drivers.map((driver) =>
                                    <div key={driver.firstName} className="BoxDrag" >
                                        <li>
                                            <span>ФИО:</span>
                                            <span>{`${driver.secondName} ${driver.firstName.substr(0, 1)}.${driver.middleName.substr(0, 1)}.`}</span>
                                        </li>
                                        <li>
                                            <span>Должность:</span>
                                            <span>{driver.job_position}</span>
                                        </li>

                                        <li>
                                            <span>Гос.номер:</span>
                                            <span>{crewItem.vehicle.license_number}</span>
                                        </li>
                                        <li>
                                            <span>Тип:</span>
                                            <span>{crewItem.vehicle.type_vehicle}</span>
                                        </li>
                                        <li>
                                            <span>Износ:</span>
                                            <span>{crewItem.vehicle.wear_vehicle}%</span>
                                        </li>
                                        <li>
                                            <span>Макс. вес:</span>
                                            <span>{crewItem.vehicle.max_shipment}кг</span>
                                        </li>
                                        {/*<span>ФИО: {`${driver.secondName} ${driver.firstName.substr(0,1)}.${driver.middleName.substr(0,1)}.`}</span>*/}
                                        {/*<span>Должность: {driver.job_position}</span>*/}
                                        {/*<span>Гос.номер: {crewItem.vehicle.license_number}</span>*/}
                                        {/*<span>Тип: {crewItem.vehicle.type_vehicle}</span>*/}
                                        {/*<span>Износ: {crewItem.vehicle.wear_vehicle}%</span>*/}
                                    </div>)

                                }
                            </BoxItem> : null
                        )}
                    </Box>



                    {/*<div className="box" id="crewBox"*/}
                    {/*     onDrop={(e)=>Drop(e, boxes.crewBox )}*/}
                    {/*>*/}
                    {/*    <div className="box_ttitle">Маршрут</div>*/}
                    {/*    {boxes.crewBox.map( item =>*/}
                    {/*        <div className="BoxItem" id="crewBox"*/}
                    {/*             key={item.vehicle.type_vehicle}*/}
                    {/*             draggable={true}*/}
                    {/*             // onDrop={(e)=>Drop(e, boxes.crewBox ,item)}*/}
                    {/*             onDragOver={(e)=>dragover(e)}*/}
                    {/*             onDragStart = {(e) => dragStart(e, boxes.crewBox, item)}*/}
                    {/*             onDragEnd={(e) => dragEnd(e)}*/}
                    {/*             onDragLeave={(e => dragLeave(e))}*/}
                    {/*        >*/}
                    {/*            <span>{item.vehicle.type_vehicle}</span>*/}
                    {/*        </div>*/}

                    {/*    )}*/}
                    {/*</div>*/}
                    {/*<div className="box" id="routeBox">*/}
                    {/*    <div className="box_ttitle">Маршрут</div>*/}
                    {/*    {boxes.routeBox.map( item =>*/}
                    {/*        <div className="BoxItem"*/}
                    {/*             key={item.titleRoute}*/}
                    {/*             draggable={true}*/}
                    {/*             onDrop={(e)=>Drop(e)}*/}
                    {/*             onDragOver={(e)=>dragover(e)}*/}
                    {/*             onDragStart = {(e) => dragStart(e)}*/}
                    {/*             onDragEnd={(e) => dragEnd(e)}*/}
                    {/*             onDragLeave={(e => dragLeave(e))}*/}
                    {/*        >*/}
                    {/*            <span>{item.titleRoute}</span>*/}
                    {/*        </div>*/}

                    {/*    )}*/}

                    {/*</div>*/}





                    {/*<Box className="box" id="routeBox" title={"Маршруты"}>*/}
                    {/*    {boxes.routeBox && boxes.routeBox.map((routeItem,i) =>*/}
                    {/*        <BoxItem key={i} className="BoxItem" id={routeItem.titleRoute}>*/}
                    {/*            <h3>{routeItem.titleRoute}</h3>*/}
                    {/*        </BoxItem>*/}
                    {/*    )}*/}
                    {/*</Box>*/}
                    {/*<Box className="box" id="crewBox" title={"Экипаж"}>*/}
                    {/*    {boxes.crewBox && boxes.crewBox.map((crewItem,i) => crewItem.drivers.length !== 0 ?*/}
                    {/*        <BoxItem key={i} className="BoxItem" id={crewItem.vehicle.license_number} data={crewItem} func={setFlightRouteBox}>*/}
                    {/*            {crewItem.drivers.map((driver) =>*/}
                    {/*                <div key={driver.firstName}  className="BoxDrag"  >*/}
                    {/*                    <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>*/}
                    {/*                    <span>{driver.job_position}</span>*/}
                    {/*                    <span>{crewItem.vehicle.license_number}</span>*/}
                    {/*                    <span>{crewItem.vehicle.type_vehicle}</span>*/}
                    {/*                    <span>{crewItem.vehicle.wear_vehicle}</span>*/}
                    {/*                </div>)*/}

                    {/*            }*/}
                    {/*        </BoxItem> : null*/}
                    {/*    )}*/}
                    {/*</Box>*/}



                    {/*{boxes.routeBox && <Box id="board-1" className="box">*/}
                    {/*    {boxes.routeBox.map((item,index) =>*/}
                    {/*        <BoxItem key={index} id={item.titleRoute}   className="BoxItem">*/}
                    {/*            <div draggable="true" id={item.titleRoute}>*/}
                    {/*                <h3>{item.titleRoute}</h3>*/}
                    {/*            </div>*/}
                    {/*        </BoxItem>*/}
                    {/*    )}*/}
                    {/*</Box>}*/}
                    {/*<div className="drag-result">*/}
                    {/*    <div className="drag-container">*/}
                    {/*        <div className="header">*/}
                    {/*            <h2>Рейс</h2>*/}
                    {/*        </div>*/}
                    {/*        <div className="content">*/}
                    {/*            <div className="content_router">*/}
                    {/*                <h5>Маршрут</h5>*/}
                    {/*                <Box id="board-route" className="box_router">*/}
                    {/*                    /!*{routeDrop}*!/*/}
                    {/*                </Box>*/}
                    {/*            </div>*/}
                    {/*            <div className="content_crew">*/}
                    {/*                <h5>Экипаж</h5>*/}
                    {/*                <Box id="board-crew" className="box_crew">*/}
                    {/*                    /!*{crewDrop}*!/*/}
                    {/*                </Box>*/}
                    {/*            </div>*/}

                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*{boxes.crewBox && <Box id="board-2" className="box">*/}
                    {/*    <BoxItem  >*/}
                    {/*        {boxes.crewBox.map((item,index) =>   item.drivers.length !== 0 ?*/}
                    {/*            <div id={item.vehicle.license_number} key={index} draggable="true"   className="BoxItem">*/}
                    {/*                {item.drivers.map((driver, index) =>*/}
                    {/*                    <div key={index}  className="BoxDrag"  >*/}
                    {/*                        <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>*/}
                    {/*                        <span>{driver.job_position}</span>*/}
                    {/*                        <span>{item.vehicle.license_number}</span>*/}
                    {/*                        <span>{item.vehicle.type_vehicle}</span>*/}
                    {/*                        <span>{item.vehicle.wear_vehicle}</span>*/}
                    {/*                    </div>)*/}
                    {/*                }*/}
                    {/*            </div>*/}
                    {/*            :null)}*/}
                    {/*    </BoxItem>*/}
                    {/*    */}
                    {/*    /!*{crew.message.map((item,index) =>*!/*/}
                    {/*    /!*    item.drivers.length !== 0 ?*!/*/}
                    {/*    /!*        <BoxItem key={index} id={item.vehicle.license_number} datalist={item}  className="BoxItem">*!/*/}
                    {/*    /!*            <div id={item.vehicle.license_number} draggable="true">*!/*/}
                    {/*    /!*            {item.drivers.map((driver, index) =>*!/*/}
                    {/*    /!*                <div key={index}  className="BoxDrag"  >*!/*/}
                    {/*    /!*                    <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>*!/*/}
                    {/*    /!*                    <span>{driver.job_position}</span>*!/*/}
                    {/*    /!*                    <span>{item.vehicle.license_number}</span>*!/*/}
                    {/*    /!*                    <span>{item.vehicle.type_vehicle}</span>*!/*/}
                    {/*    /!*                    <span>{item.vehicle.wear_vehicle}</span>*!/*/}

                    {/*    /!*                </div>)*!/*/}
                    {/*    /!*            }*!/*/}
                    {/*    /!*            </div>*!/*/}
                    {/*    /!*        </BoxItem>*!/*/}
                    {/*    /!*        : null*!/*/}
                    {/*    /!*)}*!/*/}
                    {/*</Box>}*/}
                    {/*{(coordinates.result && crew.message) && <div className="boxes">*/}
                    {/*    <Box datalist={coordinates.result}/>*/}
                    {/*    <Box datalist={crew.message}/>*/}
                    {/*</div>*/}
                    {/*}*/}
                </div>

                <div className="Crew-footer">
                    {/*<button onClick={() => saveData()}>Сохранить</button>*/}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => saveData()}
                    >
                        Сохранить
                    </Button>
                    <Button
                        variant="outlined"
                        // color="error"
                        onClick={() => clearDragBox()}
                    >
                        Очистить
                    </Button>
                </div>

            {/*</div>*/}

        </div>
    );
};

export default Crew;