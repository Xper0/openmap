import axios from "axios";

const localHostUrl = "http://127.0.0.1:5000/api"
const herokuUrl = "https://apiopenmap.herokuapp.com/api"

const instance = axios.create({
    baseURL: herokuUrl
});

export default instance;