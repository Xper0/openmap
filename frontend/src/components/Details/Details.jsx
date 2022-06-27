import React, {useContext} from 'react';
import "./details.scss";
import AppContext from "../../context/Context";
import { useDispatch, useSelector} from "react-redux";
import { setShowActiveDetails } from "../../redux/features/activePageSlice";

const Details = ({items}) => {
    console.log(items)
    return (
        <div className="Details">
            <h1>О рейсе</h1>
            <div className="Details-content">
                <label className="Details-content__title">Маршрут:</label>
                <span className="Details-content__desc">
                  {items.router.titleRoute}
                </span>
                <label className="Details-content__title">ФИО:</label>
                <span className="Details-content__desc">
                    {
                     `${items.drivers.drivers[0].secondName}
                     ${items.drivers.drivers[0].firstName}
                     ${items.drivers.drivers[0].middleName}`
                    }
                </span>
                <label className="Details-content__title">Должность:</label>
                <span className="Details-content__desc">
                  {items.drivers.drivers[0].job_position}
                </span>
                <label className="Details-content__title">Гос. Номер:</label>
                <span className="Details-content__desc">{items.drivers.vehicle.license_number}</span>
                <label className="Details-content__title">Тип машины:</label>
                <span className="Details-content__desc">{items.drivers.vehicle.type_vehicle}</span>
                <label className="Details-content__title">Износ:</label>
                <span className="Details-content__desc">{items.drivers.vehicle.wear_vehicle}%</span>
                <label className="Details-content__title">Гос. Номер:</label>
                <span className="Details-content__desc">{items.drivers.vehicle.license_number}</span>

            </div>
        </div>
    );
};

export default Details;