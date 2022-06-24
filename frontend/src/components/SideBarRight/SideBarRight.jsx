import React from 'react';
import  "./sidebarright.scss";
import Listroute from "../Listroute/Listroute";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";


const SideBarRight = () => {
    return (
        <div className="SideBarRight">
            <h1>Активные рейсы</h1>
            <Listroute>
                <div className="SideBarRight__item">
                    <LocalShippingIcon fontSize="large" color="primary" />
                    {/*{listItem.router.titleRoute}*/}
                    <span>База 1 - Склад 1</span>
                </div>
            </Listroute>
        </div>
    );
};

export default SideBarRight;