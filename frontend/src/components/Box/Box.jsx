import React, {useContext, useState} from 'react';
import "./box.scss";
import {DropTarget, DragDropContainer} from "react-drag-drop-container";
import BoxItem from "../BoxItem/BoxItem";
import AppContext from "../../context/Context";

const Box = (props, datalist) => {
    const [item, setItem] = useState([datalist])
    const {boxes, setBoxes, flightRouteBox, setFlightRouteBox, flightCrewBox, setFlightCrewBox, setRouteDrop,setCrewDrop,swap, setSwap, setCrew, setCrewRoute}  = useContext(AppContext)
    const [changeItem, setChangeItem] = useState([])
    const drop = (e, dats) => {
        e.preventDefault();
        console.log(datalist)
        console.log(dats)
        console.log(e.dataTransfer.getData(props))
        const card_id = e.dataTransfer.getData("card_id")
        console.log(card_id)
        const card = document.getElementById(card_id)
        // card.style.display = "block"
        console.log(card)
        switch (card_id) {
            case "board-route": {
                setRouteDrop();
                break;
            }
            case "board-crew": {
                setCrewDrop()
                break;
            }
        }

        // setRouteDrop()
        // setCrewDrop()
        let item = e.target.appendChild(card)


    }
    const dragover = (e) => {
        e.preventDefault();

        // console.log(e)
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

    const kill = (uid) => {
        // let items = this.state.items.slice();
        // const index = items.findIndex((item) => {
        //     return item.uid == uid
        // });
        // if (index !== -1) {
        //     items.splice(index, 1);
        // }
        // this.setState({items: items});
    };

    return (
        <div
            // className="Box"
             className={props.className}
             id={props}
             onDrop={(e) => drop(e, datalist)}
             onDragOver={dragover}
        >
            <div className="box-title">{props.title}</div>
            {props.children}
        </div>
    );
};

export default Box;