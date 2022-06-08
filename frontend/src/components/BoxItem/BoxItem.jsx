import React, {useContext, useState} from 'react';
import "./boxItem.scss";
import {DragDropContainer, DropTarget} from "react-drag-drop-container";
import AppContext from "../../context/Context";

const BoxItem = (props,data) => {
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

    const drop = (e) => {
        e.preventDefault();
        console.log(e)
    }
    const dragover = (e) => {
        e.preventDefault();
        // console.log(e)
    }
    const dragStart = (e) => {
        const target = e.target
        console.log(props)
        let item = e.dataTransfer.setData("card_id", target.id)
        // console.log(target)
        setTimeout(() => {
            target.style.border = "none"
        }, 0)
    }

    return (
        <div
            // className="BoxItem"
            className={props.className}
            id={props.id}
            onDrop={drop}
            onDragOver={dragover}
            onDragStart={dragStart}
        >
            {/*/!*<DragDropContainer*!/*/}
            {/*/!*    targetKey="boxItem"*!/*/}
            {/*/!*    dragData={data}*!/*/}
            {/*/!*    // onDrop={this.deleteMe}*!/*/}
            {/*/!*    // disappearDraggedElement={true}*!/*/}
            {/*/!*    dragHandleClassName="grabber"*!/*/}
            {/*/!*>*!/*/}
            {/*    <DropTarget*/}
            {/*        onHit={handleDrop}*/}
            {/*        targetKey="boxItem"*/}
            {/*    >*/}
            {/*        <div className="outer">*/}
            {/*            <div className="item">*/}
            {/*                <span className="grabber">&#8759;</span>*/}
            {/*                {item.hasOwnProperty("drivers") ? item.drivers.map( (driver,index) =>*/}
            {/*                    <div key={index}>*/}
            {/*                        <h3>{`${driver.firstName} ${driver.secondName} ${driver.middleName}`}</h3>*/}
            {/*                        <span>{driver.job_position}</span>*/}
            {/*                        <span>{item.vehicle.license_number}</span>*/}
            {/*                        <span>{item.vehicle.type_vehicle}</span>*/}
            {/*                        <span>{item.vehicle.wear_vehicle}</span>*/}
            {/*                    </div>*/}
            {/*                ) :*/}
            {/*                    (item.titleRoute &&*/}
            {/*                      <div >*/}
            {/*                          <h3>{item.titleRoute}</h3>*/}
            {/*                      </div>)*/}

            {/*                }*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </DropTarget>*/}
            {/*</DragDropContainer>*/}
            {props.children}
        </div>
    );
};

export default BoxItem;