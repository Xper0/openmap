import React, {useContext, useEffect, useState} from 'react';
import {Autocomplete, TextField, Box,Fab} from "@mui/material";
import AppContext from "../../context/Context";
import AddIcon from '@mui/icons-material/Add';
import "./flightrouter.scss";
import { List, ListItem, Divider,ListItemText   } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import {setFlightRoute} from "../../redux/features/mapSlice";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { setActiveRoute } from "../../redux/features/mapSlice";
import Listroute from "../Listroute/Listroute";





const FlightRouter = () => {
    const dispatch = useDispatch()
    const {fetching,setFetching, activePage, setActivePage, flightRouter, setFlightRouter, loading, setLoading} = useContext(AppContext)
    const { flightRoute, activeRoute } = useSelector( state => state.mapSlice)
    let [value,setValue] = useState("")

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
            <h1>Активные маршруты</h1>
                    <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        onClick={() => setActivePage(!activePage)}>
                        <AddIcon />
                    </Fab>
            <Listroute>
                <div className="flightrouter-item-container">
                    <div className="flightrouter-item-header">
                        <h3 className="flightrouter-item-header__route-duration">2ч 30мин</h3>
                        <span className="flightrouter-item-header__route-hint">Прибытие в 12:58</span>
                    </div>
                    <div className="flightrouter-item-content">
                        <LocalShippingIcon fontSize="large" color="primary" />
                        {/*{listItem.router.titleRoute}*/}
                        <span>
                                            База 1 - Склад 1
                                        </span>


                    </div>
                    <div className="flightrouter-item-footer">
                        <span>Подробнее</span>
                    </div>

                </div>
            </Listroute>
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


        </div>
    );
};

export default FlightRouter;