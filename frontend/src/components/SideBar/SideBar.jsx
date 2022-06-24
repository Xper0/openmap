import React, {useContext, useState} from 'react';
import "./SideBar.scss";
import AppContext from "../../context/Context";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Sidebar = ({active, setActive, children}) => {
    const {activePage, setActivePage, openDraw, setOpenDraw} = useContext(AppContext)
    // const {openDraw, setOpenDraw, totalPrice} = useCart()
    // const [orderId, setOrderId] =useState(null)
    // const [isOrderComplete, setIsOrderComplete] = React.useState(false);

    function onClose(){
        setOpenDraw(!openDraw)
    }
    function onClosePage () {

    }

    return (
        <div className={`Drawer ${openDraw ? "Drawer-active" : ""}`}
        >
            <div className="Drawer-content">
                {!activePage ? (
                        <>
                            <div className="Sidebar-containerBtnCancel" onClick={() => setActivePage(!activePage)}>
                                <ClearOutlinedIcon className="Sidebar-containerBtn__btn"/>
                            </div>
                            <div className="Sidebar-containerBtn crew-btn" onClick={onClose}>
                                <ArrowBackIosIcon className="Sidebar-containerBtn__btn"/>
                            </div>
                        </>
                ) :

                    (<div className="Sidebar-containerBtn" onClick={onClose}>
                        <ArrowBackIosIcon className="Sidebar-containerBtn__btn" />
                </div>)
                }
                {children}
            </div>

        </div>
    );
};

export default Sidebar;