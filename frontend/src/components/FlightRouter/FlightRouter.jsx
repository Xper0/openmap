import React, {useContext, useEffect, useState} from 'react';
import {Autocomplete, TextField, Box, Fab, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import AppContext from "../../context/Context";
import AddIcon from '@mui/icons-material/Add';
import "./flightrouter.scss";
import {List, ListItem, Divider, ListItemText} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import {setFlightRoute} from "../../redux/features/mapSlice";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {setActiveRoute} from "../../redux/features/mapSlice";
import AddRoadIcon from '@mui/icons-material/AddRoad';
import FilterListIcon from '@mui/icons-material/FilterList';
import { setActivePage, setShowActiveDetails, setShowActiveFilter } from "../../redux/features/activePageSlice";
import Listroute from "../Listroute/Listroute";
import Details from "../Details/Details";

const FlightRouter = () => {
    const dispatch = useDispatch()
    const {
        fetching,
        setFetching,
        flightRouter,
        setFlightRouter,
        loading,
        setLoading
    } = useContext(AppContext)


    const { flightRoute, activeRoute } = useSelector(state => state.mapSlice)
    const { activePage, showActiveDetails, showActiveFilter } = useSelector(state => state.activePageSlice)
    const [flightItem, setFlightItem] = useState([])
    const MouseOver = (e, listItem) => {
        dispatch(setActiveRoute({
            roadColor: "#ff0000",
            flightRoute: listItem
        }))
    }
    const MouseOut = (e, listItem) => {
        dispatch(setActiveRoute({
                roadColor: "#808080",
                flightRoute: []
            }
        ))
    }
    const getDetails = (listItem) => {
        dispatch(setShowActiveDetails(showActiveDetails))
        setFlightItem(listItem)
    }
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
        <div className="flightrouter">
            {showActiveDetails ? <Details items={flightItem} /> :
                <>
            <h1>Активные маршруты</h1>
            <div className="flightrouter-add-btn">
                <div
                    className="flightrouter-add-btn__filter"
                    onClick={() => dispatch(setShowActiveFilter(showActiveFilter))}
                >
                    <FilterListIcon />
                    <h3>Фильтр</h3>
                </div>
                <div className="search__container">
                    <input className="search__input" type="text" placeholder="Search" />
                </div>
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => dispatch(setActivePage(activePage))}
                >
                    <AddRoadIcon />
                    {/*<AddIcon/>*/}
                </Fab>
            </div>
            <div className="flightrouter-container">
                {showActiveFilter ?
                    <div className="flightrouter-content-filter">
                        <FormControl variant="standard" sx={{m: 3, minWidth: 200, height: 140}}>
                            <InputLabel id="demo-simple-select-standard-label">Маршрут</InputLabel>
                            <Select
                                label="Маршрут"
                            >
                                <MenuItem>Актиный</MenuItem>
                                <MenuItem>Завершенный</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    : null}

                <div className="flightrouter-content">
                    <List>
                        {loading && flightRoute.map( listItem =>
                            <div key={listItem._id}
                                 onMouseOver={(e) => MouseOver(e, listItem)}
                                 onMouseOut={(e) => MouseOut(e, listItem)}
                                 onClick={() => getDetails(listItem)}
                                 style={{width: "100%"}}
                            >
                                <ListItem button>
                                    {/*<ListItemText>*/}
                                    <div className="flightrouter-item-container">
                                        <div className="flightrouter-item-header">
                                            <h3 className="flightrouter-item-header__route-duration">2ч 30мин</h3>
                                            <span className="flightrouter-item-header__route-hint">Прибытие в 12:58</span>
                                        </div>
                                        <div className="flightrouter-item-content">
                                            <LocalShippingIcon fontSize="large" color="primary"/>
                                            {/*{listItem.router.titleRoute}*/}
                                            <span>
                                            База 1 - Склад 1
                                        </span>


                                        </div>
                                        <div
                                            className="flightrouter-item-footer"
                                        >
                                            <span>Подробнее</span>
                                        </div>

                                    </div>
                                    {/*</ListItemText>*/}
                                </ListItem>
                                <Divider/>
                            </div>
                        )}
                    </List>



                    {/*<Listroute>*/}
                    {/*    <div className="flightrouter-item-container">*/}
                    {/*        <div className="flightrouter-item-header">*/}
                    {/*            <h3 className="flightrouter-item-header__route-duration">2ч 30мин</h3>*/}
                    {/*            <span className="flightrouter-item-header__route-hint">Прибытие в 12:58</span>*/}
                    {/*        </div>*/}
                    {/*        <div className="flightrouter-item-content">*/}
                    {/*            <LocalShippingIcon fontSize="large" color="primary"/>*/}
                    {/*            /!*{listItem.router.titleRoute}*!/*/}
                    {/*            <span>*/}
                    {/*                        База 1 - Склад 1*/}
                    {/*                    </span>*/}


                    {/*        </div>*/}
                    {/*        <div*/}
                    {/*            className="flightrouter-item-footer"*/}
                    {/*        >*/}
                    {/*            <span>Подробнее</span>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}
                    {/*</Listroute>*/}
                </div>

            </div>
            {/*<div className="flightrouter-content">*/}
            {/*    <Listroute>*/}
            {/*        <div className="flightrouter-item-container">*/}
            {/*            <div className="flightrouter-item-header">*/}
            {/*                <h3 className="flightrouter-item-header__route-duration">2ч 30мин</h3>*/}
            {/*                <span className="flightrouter-item-header__route-hint">Прибытие в 12:58</span>*/}
            {/*            </div>*/}
            {/*            <div className="flightrouter-item-content">*/}
            {/*                <LocalShippingIcon fontSize="large" color="primary"/>*/}
            {/*                /!*{listItem.router.titleRoute}*!/*/}
            {/*                <span>*/}
            {/*                                База 1 - Склад 1*/}
            {/*                            </span>*/}


            {/*            </div>*/}
            {/*            <div className="flightrouter-item-footer">*/}
            {/*                <span>Подробнее</span>*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*    </Listroute>*/}
            {/*</div>*/}
            {/*<List>*/}
            {/*    {loading && flightRoute.map( listItem =>*/}
            {/*        <div key={listItem._id}*/}
            {/*             onMouseOver={(e) => MouseOver(e, listItem)}*/}
            {/*             onMouseOut={(e) => MouseOut(e, listItem)}*/}
            {/*        >*/}
            {/*            <ListItem button>*/}
            {/*                <ListItemText>*/}
            {/*                    <div className="flightrouter-item-container">*/}
            {/*                        <div className="flightrouter-item-header">*/}
            {/*                            <h3 className="flightrouter-item-header__route-duration">2ч 30мин</h3>*/}
            {/*                            <span className="flightrouter-item-header__route-hint">Прибытие в 12:58</span>*/}
            {/*                        </div>*/}
            {/*                        <div className="flightrouter-item-content">*/}
            {/*                            <LocalShippingIcon fontSize="large" color="primary" />*/}
            {/*                            /!*{listItem.router.titleRoute}*!/*/}
            {/*                            <span>*/}
            {/*                                База 1 - Склад 1*/}
            {/*                            </span>*/}


            {/*                        </div>*/}
            {/*                        <div className="flightrouter-item-footer">*/}
            {/*                            <span>Подробнее</span>*/}
            {/*                        </div>*/}

            {/*                    </div>*/}
            {/*                </ListItemText>*/}
            {/*            </ListItem>*/}
            {/*            <Divider/>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</List>*/}
                </>
                }
        </div>
    );
};

export default FlightRouter;