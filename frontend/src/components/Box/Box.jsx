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

    const [item, setItem] = useState([datalist])
    const {boxes, setBoxes, flightRouteBox, setFlightRouteBox, flightCrewBox, setFlightCrewBox, setRouteDrop,setCrewDrop,swap, setSwap, setCrew, setCrewRoute}  = useContext(AppContext)
    const [changeItem, setChangeItem] = useState([])
    const drop = (e, dats) => {
        e.preventDefault();
        console.log(dragdropData)
        console.dir(props.id)
        console.log(copyBoxDta[dragdropData.id])
        const currentItem = copyBoxDta[dragdropData.id].indexOf(dragdropData.initialItem);

        copyBoxDta[dragdropData.id].splice(currentItem, 1);
        console.log(copyBoxDta)
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





    const handleDrop = (e) => {
        // console.log(item)
        // console.log(e)

        // items.push({label: e.dragData.label, uid: shortid.generate()});
        // this.setState({items: items});
        setItem(swap)
        e.containerElem.style.visibility="hidden";
    };



    const swaper = (fromIndex, toIndex, dragData) => {
        // let items = this.state.items.slice();
        // const item = {label: dragData.label, uid: shortid.generate()};
        // items.splice(toIndex, 0, item);
        // this.setState({items: items});
    };



    return (
        <div
            // className="Box"
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