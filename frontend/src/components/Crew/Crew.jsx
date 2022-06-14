import React, {useContext, useEffect, useState} from 'react';
import Box from "../Box/Box";
import BoxItem from "../BoxItem/BoxItem";
import AppContext from "../../context/Context";
import "./crew.scss";
import { useSelector, useDispatch } from 'react-redux'
import {setInitData} from "../../redux/features/dragdropSlice";

import road from "../../assets/roades.json";
import point from "turf-point";
import nearestPoint from "@turf/nearest-point";
import PathFinder from "geojson-path-finder";
import axios from "axios";
import {Button} from "@mui/material";

const Crew = () => {
    const {setFlightCrewBoxrouteDrop, setRouteDrop,crewDrop, setCrewDrop,activePage, setActivePage,coordinates, setCoordinates, loading, setLoading, crew, setCrew}  = useContext(AppContext)
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

    const [initialState,setInitialState] = useState( {
        routeGroup: coordinates.result,
        crewGroup: [{titleRoute: "Маршрут3"},{titleRoute: "Маршрут4"}],
        resultGroup: []
    })

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

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const Drop = (e) => {
        e.preventDefault();

        setFlightRouteBox(currentItem)
        // const currentIndex = currentBoard.indexOf(currentItem)
        // currentBoard.splice(currentIndex, 1)
        // const dropIndex = boxes.crewBox.indexOf(currentItem)
        // boxes.crewBox.splice(dropIndex + 1,0,currentItem)
        // setBoxes(Object.keys(boxes).map(b => {
        //     if (b ==="crewBox"){
        //         return b = currentBoard
        //     }
        //     return b = boxes[b]
        // }))

    }

    const dragover = (e) => {
        e.preventDefault();
        if (e.target.className == "BoxItem") {
            e.target.style.boxShadow = "0 4px 3px gray"
        }
    }
    const dragEnd = (e) => {
        e.preventDefault();
        e.target.style.boxShadow = "none"
    }
    const dragLeave = (e) => {
        e.preventDefault();
        e.target.style.boxShadow = "none"
    }
    const dragStart = (e,board,item) => {
        setCurrentItem(item)
        setCurrentBoard(board)
        const target = e.target
        let itemId = e.dataTransfer.setData("card_id", target.id)
        // setTimeout(() => {
        //     target.style.border = "none"
        // }, 0)
    }

    const [dragData, setDragData] = useState({});
    function handleDragEnter(e, group) {
        
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragLeave() {

    }
    const changeCategory = (itemId, group) => {
        // const currentItem = initialState[itemId].indexOf(dragData.initialItem);
        const currentItem = copyBoxDta[itemId].indexOf(dragData.initialItem);
        // const dropIndex =
        let dropdata = copyBoxDta[itemId].splice(currentItem, 1);
        copyBoxDta[group].push(dragData.initialItem)
        // const newList = {
        //     routeGroup: delEl,
        //     resultGroup: addEl
        // }
        // const obj = Object.assign(initialState, {
        //     routeGroup: delEl,
        //     resultGroup: [addEl],
        //     crewGroup: initialState.crewGroup
        //
        // })
        dispatch(setInitData(copyBoxDta))
        // setInitialState(prev => ({...prev, ...initialState}))

        // let arr = newItems.map()

        // console.log(arr)
        // newItems[itemId - 1].group = group;
        // setInitialState([...newItems]);
    };

    function handleDrop(e, group) {
        const selected = dragData.id
        changeCategory(selected, group);
    }

    function handleDragStart(e, id, item) {
        setDragData({ id: id, initialItem: item });
    }
    const saveData = async () => {
      if((boxData.flightCrewBox.length && boxData.flightRouteBox.length && boxData.flightShipment.length) !== 0){
         let obj = {
             router: boxData.flightRouteBox[0]._id,
             drivers: boxData.flightCrewBox[0]._id,
             date: new Date(),
             shipment: boxData.flightShipment[0]._id
         }
          const {data} = await axios.post("http://127.0.0.1:5000/api/flightRouter", obj)
          console.log(data.message)
          window.alert("Новый рейс создан")
      }
      else {
          window.alert("Не все поля заполнены!")
      }
    }

    return (
        <div className="Crew">
            {/*<div className="Map-option">*/}
                {/*<button onClick={() => showPath()} >Расчет</button>*/}
                {/*<button onClick={() => createAutoRoute()} >Построить маршрут</button>*/}
                {/*<button onClick={()=> clearMap()}>Очистить карту</button>*/}
                {/*<button onClick={() => load()}>Загрузить данные</button>*/}
                <div className="drag_things_to_boxes">
                        {/*<div className="box" id="routeGroup"*/}
                        {/*     onDragEnter={(e) => handleDragEnter(e)}*/}
                        {/*     onDragOver={handleDragOver}*/}
                        {/*     onDragLeave={handleDragLeave}*/}
                        {/*     onDrop={(e) => handleDrop(e, "routeBox")}*/}
                        {/*>*/}
                        {/*    <h1>{"Маршруты"}</h1>*/}
                        {/*    <div>*/}
                        {/*        {boxData.routeBox.map(item =>*/}
                        {/*            <div*/}
                        {/*                key={item.titleRoute}*/}
                        {/*                className="BoxItem"*/}
                        {/*                draggable={true}*/}
                        {/*                onDragStart={(e) => handleDragStart(e, "routeBox", item)}*/}
                        {/*            >*/}
                        {/*                <span>{item.titleRoute}</span>*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    {/*<div className="box" id="crewGroup"*/}
                    {/*     onDragEnter={(e) => handleDragEnter(e)}*/}
                    {/*     onDragOver={handleDragOver}*/}
                    {/*     onDragLeave={handleDragLeave}*/}
                    {/*     onDrop={(e) => handleDrop(e, "crewGroup")}*/}
                    {/*>*/}
                    {/*    <h1>{"Экипаж"}</h1>*/}
                    {/*    <div>*/}
                    {/*        {initialState.crewGroup.map((item,i) =>*/}
                    {/*            <div   key={item.titleRoute}*/}
                    {/*                   className="BoxItem"*/}
                    {/*                   draggable={true}*/}
                    {/*                   onDragStart={(e) => handleDragStart(e,  "crewGroup", item)}>*/}
                    {/*                <span>{item.titleRoute}</span>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="box" id="resultGroup"*/}
                    {/*     onDragEnter={(e) => handleDragEnter(e)}*/}
                    {/*     onDragOver={handleDragOver}*/}
                    {/*     onDragLeave={handleDragLeave}*/}
                    {/*     onDrop={(e) => handleDrop(e, "flightRouteBox")}*/}
                    {/*>*/}
                    {/*    <h1>{"Результат"}</h1>*/}
                    {/*        {boxData.flightRouteBox.map( (item,index) =>*/}
                    {/*            <div*/}
                    {/*                key={index}*/}
                    {/*                className="BoxItem"*/}
                    {/*                draggable={true}*/}
                    {/*                onDragStart={(e) => handleDragStart(e,  "flightRouteBox", item)}>*/}
                    {/*                {item.titleRoute}*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*</div>*/}

                    <Box className="box" id="routeBox" title={"Маршруты"}>
                            {boxData.routeBox && boxData.routeBox.map((routeItem,i) =>
                                <BoxItem
                                    key={i}
                                    className="BoxItem"
                                    id={"routeBox"}
                                    item={routeItem}
                                >
                                    <h3>{routeItem.titleRoute}</h3>
                                </BoxItem>
                            )}
                    </Box>
                    <Box className="box" id="shipmentBox" title={"Груз"}>
                        {boxData.shipmentBox && boxData.shipmentBox.map((shipmentItem,i) =>
                            <BoxItem
                                key={shipmentItem._id}
                                className="BoxItem"
                                id={"shipmentBox"}
                                item={shipmentItem}
                            >
                                {shipmentItem.shipment.map( (ship,i) =>
                                    <div key={i} className="BoxDrag" >
                                        <h3>{ship.name}</h3>
                                        <span>{ship.weight}</span>
                                        {ship.producer &&
                                            <span>{ship.producer}</span>
                                        }
                                    </div>
                                )}
                            </BoxItem>
                        )}
                    </Box>

                    <div className="drag-result">
                        <div className="drag-container">
                            <div className="header">
                                <h2>Рейс</h2>
                            </div>
                            <div className="content">
                                <div className="content_router">
                                    <h5>Маршрут</h5>
                                    <Box id="flightRouteBox" className="box_router">
                                        {/*{boxData.flightRouteBox}*/}
                                        {boxData.flightRouteBox && boxData.flightRouteBox.map((routeItem,i) =>
                                            <BoxItem
                                                key={i}
                                                className="BoxItem"
                                                id={"flightRouteBox"}
                                                item={routeItem}
                                            >
                                                <h3>{routeItem.titleRoute}</h3>
                                            </BoxItem>
                                        )}
                                    </Box>
                                </div>
                                <div className="content_crew">
                                    <h5>Экипаж</h5>
                                    <Box id="flightCrewBox" className="box_crew">
                                        {/*{boxData.flightCrewBox}*/}
                                        {boxData.flightCrewBox && boxData.flightCrewBox.map((crewItem,i) => crewItem.drivers.length !== 0 ?
                                            <BoxItem
                                                key={i}
                                                className="BoxItem"
                                                id={"flightCrewBox"}
                                                item={crewItem}
                                            >
                                                {crewItem.drivers.map((driver) =>
                                                    <div key={driver.firstName}  className="BoxDrag"  >
                                                        <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>
                                                        <span>{driver.job_position}</span>
                                                        <span>{crewItem.vehicle.license_number}</span>
                                                        <span>{crewItem.vehicle.type_vehicle}</span>
                                                        <span>{crewItem.vehicle.wear_vehicle}</span>
                                                    </div>)

                                                }
                                            </BoxItem> : null
                                        )}
                                    </Box>
                                </div>
                                <div className="content_router">
                                    <h5>Груз</h5>
                                    <Box id="flightShipment" className="box_router">
                                        {/*{boxData.flightRouteBox}*/}
                                        {boxData.flightShipment && boxData.flightShipment.map((shipmentItem,i) =>
                                            <BoxItem
                                                key={i}
                                                className="BoxItem"
                                                id={"flightShipment"}
                                                item={shipmentItem}
                                            >
                                                {shipmentItem.shipment.map( (ship,i) =>
                                                    <div key={i} className="BoxDrag" >
                                                        <h3>{ship.name}</h3>
                                                        <span>{ship.weight}</span>
                                                        {ship.producer &&
                                                            <span>{ship.producer}</span>
                                                        }
                                                    </div>
                                                )}
                                            </BoxItem>
                                        )}
                                    </Box>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Box className="box" id="crewBox" title={"Экипаж"}>
                        {boxData.crewBox && boxData.crewBox.map((crewItem,i) => crewItem.drivers.length !== 0 ?
                            <BoxItem
                                key={i}
                                className="BoxItem"
                                id={"crewBox"}
                                item={crewItem}
                            >
                                {crewItem.drivers.map((driver) =>
                                    <div key={driver.firstName}  className="BoxDrag"  >
                                        <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>
                                        <span>{driver.job_position}</span>
                                        <span>{crewItem.vehicle.license_number}</span>
                                        <span>{crewItem.vehicle.type_vehicle}</span>
                                        <span>{crewItem.vehicle.wear_vehicle}</span>
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
                <div>
                    {/*<button onClick={() => saveData()}>Сохранить</button>*/}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => saveData()}
                    >
                        Сохранить
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setActivePage(!activePage)}
                    >
                        Отменить
                    </Button>
                    {/*<button onClick={() => setActivePage(!activePage)}>Отменить</button>*/}
                </div>

            {/*</div>*/}
        </div>
    );
};

export default Crew;