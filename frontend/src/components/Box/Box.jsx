import React, {useContext, useState} from 'react';
import "./box.scss";
import {DropTarget, DragDropContainer} from "react-drag-drop-container";
import BoxItem from "../BoxItem/BoxItem";
import AppContext from "../../context/Context";
import { useSelector, useDispatch } from 'react-redux';
import {setInitData} from "../../redux/features/dragdropSlice";



const Box = (props) => {
    let boxData = useSelector( (state) => state.dragdropSlice.initData);
    let dragdropData =  useSelector( (state) => state.dragdropSlice.dragData);
    const dispatch = useDispatch();
    const copyBoxDta = JSON.parse(JSON.stringify(boxData))

    const drop = (e, dats) => {
        e.preventDefault();
        console.log(props, dragdropData)
        const elIndex = copyBoxDta[dragdropData.id].findIndex( id => id._id === dragdropData.initialItem._id)
        // copyBoxDta[dragdropData.id].splice(elIndex, 1)
        if (copyBoxDta[props.id].length === 0) {
            copyBoxDta[props.id] = [...copyBoxDta[props.id], dragdropData.initialItem]
            copyBoxDta[dragdropData.id].splice(elIndex, 1)
        }else  {
            switch (dragdropData.id) {
                case "flightRouteBox":
                    //work
                    copyBoxDta[props.id] = [...copyBoxDta[props.id], copyBoxDta[dragdropData.id][0]]
                    copyBoxDta[dragdropData.id].splice(0, 1)
                    break
                case "flightCrewBox":
                    //work
                    copyBoxDta[props.id] = [...copyBoxDta[props.id], copyBoxDta[dragdropData.id][0]]
                    copyBoxDta[dragdropData.id].splice(0, 1)
                    break;
                default:
                    //fix bug crewBox
                    copyBoxDta[dragdropData.id].splice(elIndex, 1)
                    copyBoxDta[dragdropData.id] = [...copyBoxDta[dragdropData.id], ...copyBoxDta[props.id]]
                    copyBoxDta[props.id].splice(0, 1, dragdropData.initialItem)
            }
            // copyBoxDta[props.id].splice(0, 1, dragdropData.initialItem)
            // copyBoxDta[dragdropData.id] = [...copyBoxDta[dragdropData.id], copyBoxDta[props.id][0]]
            // copyBoxDta[props.id].splice(0, 1, dragdropData.initialItem)

        }

        // copyBoxDta[props.id] = [...copyBoxDta[props.id], dragdropData.initialItem]
        // if (dragdropData.id !== ("flightCrewBox" || "flightRouteBox")){
        //     copyBoxDta[dragdropData.id] = copyBoxDta[dragdropData.id].filter( filItem => filItem._id !== dragdropData.initialItem._id)
        // }
        // // copyBoxDta[dragdropData.id] = copyBoxDta[dragdropData.id].filter( filItem => filItem._id !== dragdropData.initialItem._id)
        // // console.log(find)
        // // const currentItem = copyBoxDta[dragdropData.id].indexOf(dragdropData.initialItem);
        // // copyBoxDta[dragdropData.id].splice(currentItem, 1);
        // // copyBoxDta[props.id].push(dragdropData.initialItem)
        // console.log(dragdropData.id)//flightCrewBox
        // console.log(props.id)//crewBox
        // // copyBoxDta[props.id].push(dragdropData.initialItem)
        // copyBoxDta[props.id].push(dragdropData.initialItem)
        // if (copyBoxDta[props.id].length === 0) {
        //    copyBoxDta[props.id].push(dragdropData.initialItem)
        // }
        // else if  (dragdropData.id === ("flightCrewBox" || "flightRouteBox")) {
        //     console.log(copyBoxDta)
        //     copyBoxDta[props.id].push(copyBoxDta[dragdropData.id][0])
        //     copyBoxDta[dragdropData.id].splice(0,  1)
        // }else {
        //     // console.log("delete")
        //     // copyBoxDta[dragdropData.id].push(copyBoxDta[props.id][0])
        //     // copyBoxDta[props.id].splice(0,  copyBoxDta[props.id].length, dragdropData.initialItem)
        // }
        //
        //
        //
        // // }
        //
        dispatch(setInitData(copyBoxDta))
        // console.log(copyBoxDta)
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
             className={`${props.className} box-container`}
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