import React, {useContext} from 'react';
import { List, ListItem, Divider,ListItemText   } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setActiveRoute } from "../../redux/features/mapSlice";
import AppContext from "../../context/Context";



const Listroute = (props) => {
    const dispatch = useDispatch()
    const {fetching,setFetching, activePage, setActivePage, flightRouter, setFlightRouter, loading, setLoading} = useContext(AppContext)
    const { flightRoute, activeRoute } = useSelector( state => state.mapSlice)

    const MouseOver = (e, listItem) => {
        dispatch(setActiveRoute({
            roadColor: "#ff0000",
            flightRoute: listItem
        }))
    }
    const MouseOut = (e, listItem) => {
        dispatch(setActiveRoute({
                roadColor: "#808080",
                flightRoute: []
            }
        ))
    }

    return (
        <List>
            {loading && flightRoute.map( listItem =>
                <div key={listItem._id}
                     onMouseOver={(e) => MouseOver(e, listItem)}
                     onMouseOut={(e) => MouseOut(e, listItem)}
                     style={{width: "100%"}}
                >
                    <ListItem button>
                        {/*<ListItemText>*/}
                            {props.children}
                        {/*</ListItemText>*/}
                    </ListItem>
                    {/*<Divider/>*/}
                </div>
            )}
        </List>
    );
};

export default Listroute;