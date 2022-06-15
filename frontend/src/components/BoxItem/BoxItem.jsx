import React, {useContext, useState} from 'react';
import "./boxItem.scss";
import "../Crew/crew.scss";
import {DragDropContainer, DropTarget} from "react-drag-drop-container";
import AppContext from "../../context/Context";
import {  useDispatch } from 'react-redux'
import {dragData, setDragData} from "../../redux/features/dragdropSlice";


const BoxItem = (props,data) => {
    const dispatch = useDispatch();
    // const flightRoutId = document.querySelector('#flightRouteBox');
    // const flightCrewId = document.querySelector('#flightCrewBox');
    // const flightShipmentId = document.querySelector('#flightShipment');
    const [item, setItem] = useState(data)


    const Drop = (e) => {
        e.preventDefault();

    }
    const dragover = (e) => {
        e.preventDefault();

    }
    const dragStart = (e) => {
        const target = e.target
        dispatch(setDragData({
            id: props.id,
            initialItem: props.item
        }))
        const flightRoutId = document.querySelector('#flightRouteBox');
        const flightCrewId = document.querySelector('#flightCrewBox');
        const flightShipmentId = document.querySelector('#flightShipment');

        setTimeout(() => {
            if (props.id === "routeBox") {
                flightRoutId.style.border = "3px solid green"
            }
            if (props.id === "crewBox") {
                flightCrewId.style.border = "3px solid green"
            }
            if (props.id === "shipmentBox") {
                flightShipmentId.style.border = "3px solid green"
            }
        },0)
        // if (props.id === "routeBox") {
        //     flightRoutId.style.border = "3px solid green"
        // }
        // if (props.id === "crewBox") {
        //     flightCrewId.style.border = "3px solid green"
        // }
        // console.log(props.id)
        // if (props.id === "shipmentBox") {
        //     flightShipmentId.style.border = "3px solid green"
        // }


        // setTimeout(() => {
        //     target.style.border = "none"
        // }, 0)
    }
    const dragEnd = () => {
        const flightRoutId = document.querySelector('#flightRouteBox');
        const flightCrewId = document.querySelector('#flightCrewBox');
        const flightShipmentId = document.querySelector('#flightShipment');

        flightRoutId.style.border = "2px dotted black";
        flightCrewId.style.border = "2px dotted black";
        flightShipmentId.style.border = "2px dotted black"
    }

    return (
        <div
            // className="BoxItem"
            draggable={true}
            className={props.className}
            id={props.id}
            onDrop={Drop}
            onDragOver={dragover}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
        >
            {props.children}
        </div>
    );
};

export default BoxItem;