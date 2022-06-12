import React, {useContext, useState} from 'react';
import "./SideBar.scss";
import AppContext from "../../context/Context";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Sidebar = ({active, setActive, children}) => {
    const {openDraw, setOpenDraw} = useContext(AppContext)
    // const {openDraw, setOpenDraw, totalPrice} = useCart()
    // const [orderId, setOrderId] =useState(null)
    // const [isOrderComplete, setIsOrderComplete] = React.useState(false);

    function onClose(){
        setOpenDraw(!openDraw)
    }

    return (
        <div className={`Drawer ${openDraw ? "Drawer-active" : ""}`}
        >
            <div className="Drawer-content">
                <div className="Sidebar-containerBtn" onClick={onClose}>
                        <ArrowBackIosIcon className="Sidebar-containerBtn__btn" />
                </div>
                {children}
            </div>

        </div>
    );
};

export default Sidebar;