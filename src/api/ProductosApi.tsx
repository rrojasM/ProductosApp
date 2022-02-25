import axios from "axios";
const baseURL = 'https://app-cafe-react-native.herokuapp.com/api';
const baseURLDev = 'http://192.168.0.115:8080/api';

const productosApi = axios.create({baseURL});





export default productosApi;