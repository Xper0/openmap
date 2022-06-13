import React, {useContext, useState} from 'react';
import "./boxItem.scss";
import {DragDropContainer, DropTarget} from "react-drag-drop-container";
import AppContext from "../../context/Context";
import {  useDispatch } from 'react-redux'
import {dragData, setDragData} from "../../redux/features/dragdropSlice";


const BoxItem = (props,data) => {
    const dispatch = useDispatch();
    const {coordinates, setCoordinates, loading, setLoading, crew, setCrew, swap, setSwap}  = useContext(AppContext)

    const [item, setItem] = useState(data)
    const handleDrop = (e) => {
        e.stopPropagation();
        console.log(e)
        // setItem(e)
        setSwap(e.dragData)
        setItem(swap)
        // this.props.swap(e.dragData.index, this.props.index, e.dragData);
        e.containerElem.style.visibility="hidden";
    };
    const deleteMe = () => {
        this.props.kill(this.props.uid);
    };

    const Drop = (e) => {
        e.preventDefault();
    }
    const dragover = (e) => {
        e.preventDefault();
    }
    const dragStart = (e) => {
        const target = e.target
        console.log(props)
        dispatch(setDragData({
            id: props.id,
            initialItem: props.item
        }))
        let flightroutId = document.querySelector('#flightCrewBox');
        flightroutId.style.border = "3px solid green"
        console.log(flightroutId)

        // setTimeout(() => {
        //     target.style.border = "none"
        // }, 0)
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
        >
            {props.children}
        </div>
    );
};

export default BoxItem;