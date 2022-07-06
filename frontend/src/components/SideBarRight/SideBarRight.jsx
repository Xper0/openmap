import React, {useContext} from 'react';
import  "./sidebarright.scss";
import Listroute from "../Listroute/Listroute";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {List, ListItem} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import AppContext from "../../context/Context";
import {setActiveRoute} from "../../redux/features/mapSlice";


const SideBarRight = () => {
    const dispatch = useDispatch()
    const { loading } = useContext(AppContext)
    const { flightRoute, activeRoute } = useSelector( state => state.mapSlice)

    const MouseOver = (e, listItem) => {
        dispatch(setActiveRoute({
            roadColor: "#ff0000",
            flightRoute: listItem
        }))
    }
    const MouseOut = () => {
        dispatch(setActiveRoute({
                roadColor: "#808080",
                flightRoute: []
            }
        ))
    }
    return (
        <div className="SideBarRight">
            <h1>Активные рейсы</h1>

            <List>
                {loading && flightRoute.map( listItem =>
                    <div key={listItem._id}
                         onMouseOver={(e) => MouseOver(e, listItem)}
                         onMouseOut={(e) => MouseOut()}
                         style={{width: "100%"}}
                    >
                        <ListItem button>
                            <div className="SideBarRight__item">
                                <LocalShippingIcon fontSize="large" color="primary" />
                                {/*{listItem.router.titleRoute}*/}
                                <span>{listItem.router.titleRoute}</span>
                            </div>
                        </ListItem>
                        {/*<Divider/>*/}
                    </div>
                )}
            </List>


            {/*<Listroute>*/}
            {/*    <div className="SideBarRight__item">*/}
            {/*        <LocalShippingIcon fontSize="large" color="primary" />*/}
            {/*        /!*{listItem.router.titleRoute}*!/*/}
            {/*        <span>База 1 - Склад 1</span>*/}
            {/*    </div>*/}
            {/*</Listroute>*/}
        </div>
    );
};

export default SideBarRight;