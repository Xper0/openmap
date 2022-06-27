import React, {useContext, useState} from 'react';
import "./SideBar.scss";
import AppContext from "../../context/Context";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {useDispatch, useSelector} from "react-redux";
import { setActivePage, setShowActiveDetails } from "../../redux/features/activePageSlice";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Sidebar = ({active, setActive, children}) => {
    const { activePage, showActiveDetails } = useSelector(state => state.activePageSlice);
    const { openDraw, setOpenDraw} = useContext(AppContext)
    const dispatch = useDispatch()
    // const {openDraw, setOpenDr;aw, totalPrice} = useCart()
    // const [orderId, setOrderId] =useState(null)
    // const [isOrderComplete, setIsOrderComplete] = React.useState(false);

    function onClose(){
        setOpenDraw(!openDraw)
    }
    function onClosePage (activePage, showActiveDetails) {
        if (activePage) {
            dispatch(setActivePage(activePage))
        }else {
            dispatch(setShowActiveDetails(showActiveDetails))
        }
        console.log(activePage, showActiveDetails)
    }

    return (
        <div className={`Drawer ${openDraw ? "Drawer-active" : ""}`}
        >
            <div className="Drawer-content">
                {(activePage ||  showActiveDetails) ? (
                        <>
                            <div className="Sidebar-containerBtnCancel" onClick={() => onClosePage(activePage, showActiveDetails)}>
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