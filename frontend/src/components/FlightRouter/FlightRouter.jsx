import React, {useContext, useState} from 'react';
import {Autocomplete, TextField, Box,Fab} from "@mui/material";
import AppContext from "../../context/Context";
import AddIcon from '@mui/icons-material/Add';
import "./flightrouter.scss";

const FlightRouter = () => {
    const { activePage, setActivePage, flightRouter, setFlightRouter, loading, setLoading} = useContext(AppContext)
    let [value,setValue] = useState("")
    console.log(value)


    const defaultProps = {
        options: flightRouter.map((option, index) => option.router.titleRoute),
    };
    return (
        <div className="flightrouter">
            <h1>Готовые маршруты</h1>
            {loading &&
                <div className="flightrouter-content">
                    <Autocomplete
                        {...defaultProps}
                        sx={{ width: 300 }}
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        renderInput={(params) => (
                            <TextField  {...params} label="Выбрать маршрут" variant="standard"/>
                        )}
                    />
                    <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        onClick={() => setActivePage(!activePage)}>
                        <AddIcon />
                    </Fab>
                </div>
            }
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