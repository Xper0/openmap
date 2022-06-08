import React, {useContext} from 'react';
import Box from "../Box/Box";
import BoxItem from "../BoxItem/BoxItem";
import AppContext from "../../context/Context";
import road from "../../assets/roades.json";
import point from "turf-point";
import nearestPoint from "@turf/nearest-point";
import PathFinder from "geojson-path-finder";

const Crew = () => {
    const {coordinates, setCoordinates, loading, setLoading, crew, setCrew}  = useContext(AppContext)
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

    return (
        <div className="Crew">
            {/*<div className="Map-option">*/}
                {/*<button onClick={() => showPath()} >Расчет</button>*/}
                {/*<button onClick={() => createAutoRoute()} >Построить маршрут</button>*/}
                {/*<button onClick={()=> clearMap()}>Очистить карту</button>*/}
                <div className="drag_things_to_boxes">

                    {coordinates.result && <Box id="board-1" className="box">
                        {coordinates.result.map((item,index) =>
                            <BoxItem key={index} id={item.titleRoute}   className="BoxItem">
                                <div draggable="true" id={item.titleRoute}>
                                    <h3>{item.titleRoute}</h3>
                                </div>
                            </BoxItem>
                        )}
                    </Box>}
                    <div className="drag-result">
                        <div className="drag-container">
                            <div className="header">
                                <h2>Рейс</h2>
                            </div>
                            <div className="content">
                                <div className="content_router">
                                    <h5>Маршрут</h5>
                                    <Box className="box_router">
                                    </Box>
                                </div>
                                <div className="content_crew">
                                    <h5>Экипаж</h5>
                                    <Box className="box_crew">
                                    </Box>
                                </div>

                            </div>
                        </div>
                    </div>
                    {crew.message && <Box id="board-2" className="box">
                        {crew.message.map((item,index) =>
                            item.drivers.length !== 0 ?
                                <BoxItem key={index} id={item.vehicle.license_number} datalist={item}  className="BoxItem outer highlighted item grabber">
                                    {item.drivers.map((driver, index) =>
                                        <div key={index}  className="BoxDrag" draggable="true" id={item.vehicle.license_number}>

                                            <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>
                                            <span>{driver.job_position}</span>
                                            <span>{item.vehicle.license_number}</span>
                                            <span>{item.vehicle.type_vehicle}</span>
                                            <span>{item.vehicle.wear_vehicle}</span>

                                        </div>)
                                    }
                                </BoxItem>
                                : null
                        )}
                    </Box>}
                    {/*{(coordinates.result && crew.message) && <div className="boxes">*/}
                    {/*    <Box datalist={coordinates.result}/>*/}
                    {/*    <Box datalist={crew.message}/>*/}
                    {/*</div>*/}
                    {/*}*/}
                </div>
                <div>
                    <button>Сохранить</button>
                </div>

            {/*</div>*/}
        </div>
    );
};

export default Crew;