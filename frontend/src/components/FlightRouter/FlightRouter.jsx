import React, {useContext, useEffect, useState} from 'react';
import {Autocomplete, TextField, Box,Fab} from "@mui/material";
import AppContext from "../../context/Context";
import AddIcon from '@mui/icons-material/Add';
import "./flightrouter.scss";
import { List, ListItem, Divider,ListItemText   } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import {setFlightRoute} from "../../redux/features/mapSlice";


const FlightRouter = () => {
    const dispatch = useDispatch()
    const {fetching,setFetching, activePage, setActivePage, flightRouter, setFlightRouter, loading, setLoading} = useContext(AppContext)
    const { flightRoute } = useSelector( state => state.mapSlice)
    let [value,setValue] = useState("")


    // useEffect(() => {
    //     (async () => {
    //         if (fetching) {
    //             const [flightData ] = await Promise.all([
    //                 axios.get("http://127.0.0.1:5000/api/flightRouter"),
    //             ])
    //             dispatch(setFlightRoute(flightData.data.message))
    //             setFetching(false)
    //         }
    //     } )()
    // },[flightRoute])

    return (
        <div className="flightrouter">
            <h1>Активные маршруты</h1>
                    <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        onClick={() => setActivePage(!activePage)}>
                        <AddIcon />
                    </Fab>
            <List>
                {loading && flightRoute.map( listItem =>
                    <div key={listItem._id}>
                        <ListItem button>
                            <ListItemText>
                                {listItem.router.titleRoute}
                            </ListItemText>
                        </ListItem>
                        <Divider/>
                    </div>
                )}
            </List>

            {/*{loading &&*/}
            {/*    <div className="flightrouter-content">*/}
            {/*        <Autocomplete*/}
            {/*            {...defaultProps}*/}
            {/*            sx={{ width: 300 }}*/}
            {/*            value={value}*/}
            {/*            onChange={(event, newValue) => {*/}
            {/*                setValue(newValue);*/}
            {/*            }}*/}
            {/*            id="disable-close-on-select"*/}
            {/*            disableCloseOnSelect*/}
            {/*            renderInput={(params) => (*/}
            {/*                <TextField  {...params} label="Выбрать маршрут" variant="standard"/>*/}
            {/*            )}*/}
            {/*        />*/}
            {/*        <Fab*/}
            {/*            color="primary"*/}
            {/*            aria-label="add"*/}
            {/*            size="small"*/}
            {/*            onClick={() => setActivePage(!activePage)}>*/}
            {/*            <AddIcon />*/}
            {/*        </Fab>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*<Autocomplete*/}
            {/*    disablePortal*/}
            {/*    id="combo-box-demo"*/}
            {/*    // options={crew.message}*/}
            {/*    sx={{ width: 300 }}*/}
            {/*    // renderInput={(params) => console.log(params)}*/}
            {/*/>*/}
        </div>
    );
};

export default FlightRouter;