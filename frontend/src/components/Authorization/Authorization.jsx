import React, {useState,useEffect} from 'react';
import "./Authorization.scss";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import {setEmail, setPassword} from '../../redux/features/userInfoSlice.js';
import axios from "axios";
import { useNavigate} from "react-router";


const Authorization = () => {
    const [disable, setDisable] = useState(false);
    const {userInfo} = useSelector(state => state.userInfoSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setDisable(
            userInfo.password.length > 4 && userInfo.email.length > 5,
        );
    }, [userInfo]);

    const logIn = async () => {
        let user = await axios(`http://127.0.0.1:5000/api/login?email=${userInfo.email}&password=${userInfo.password}`)
        console.log(user)
        if (user.data.msg === "Добро пожаловать"){
            navigate("/map")

        }else {
            window.alert("Вы не авторизованы")
        }


    }

    return (
        <div className="Authorization">
            <h3 className="Authorization-title">Авторизация</h3>
            <input
                className="Authorization-input"
                placeholder="Ваша почта"
                value={userInfo.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
            />
            <input
                className="Authorization-input"
                placeholder="Пароль"
                value={userInfo.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
            />

            {disable ?  <Button onClick={logIn}  > Войти</Button> : <Button  disabled> Войти</Button>}
            <Button variant="outlined" >
                Восстановить пароль
            </Button>

        </div>
    );
};

export default Authorization;