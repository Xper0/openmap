import React, {useContext, useState} from 'react';
import "./box.scss";
import {DropTarget, DragDropContainer} from "react-drag-drop-container";
import BoxItem from "../BoxItem/BoxItem";
import AppContext from "../../context/Context";
import { useSelector, useDispatch } from 'react-redux';
import {setInitData} from "../../redux/features/dragdropSlice";



const Box = (props, datalist) => {
    let boxData = useSelector( (state) => state.dragdropSlice.initData);
    let dragdropData =  useSelector( (state) => state.dragdropSlice.dragData);
    const dispatch = useDispatch();
    const copyBoxDta = JSON.parse(JSON.stringify(boxData))

    const drop = (e, dats) => {
        e.preventDefault();
        copyBoxDta[dragdropData.id] = copyBoxDta[dragdropData.id].filter( filItem => filItem._id !== dragdropData.initialItem._id)
        // console.log(find)
        // const currentItem = copyBoxDta[dragdropData.id].indexOf(dragdropData.initialItem);
        // copyBoxDta[dragdropData.id].splice(currentItem, 1);
        copyBoxDta[props.id].push(dragdropData.initialItem)
        dispatch(setInitData(copyBoxDta))
        // const card_id = e.dataTransfer.getData("card_id")
        //
        // const card = document.getElementById(card_id)
        // card.style.display = "block"

        // switch (card_id) {
        //     case "board-route": {
        //         setRouteDrop();
        //         break;
        //     }
        //     case "board-crew": {
        //         setCrewDrop()
        //         break;
        //     }
        // }

        // setRouteDrop()
        // setCrewDrop()
        // let item = e.target.appendChild(card)


    }
    const dragover = (e) => {
        e.preventDefault();

        // console.log(e)
    }
    const  DragStart = (e) => {
        // console.log(e)
        // const card = document.getElementById("flightRouteBox")
        // console.log(card)
        // // e.style.border = "3px solid red"
        // console.dir(props.id)
    }


    return (
        <div
             className={props.className}
             id={props.id}
             onDrop={(e) => drop(e)}
             onDragStart={(e) => DragStart(e)}
             onDragOver={dragover}
        >
            <div className="box-title">{props.title}</div>
            {props.children}
        </div>
    );
};

export default Box;