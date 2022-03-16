import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL = 'https://app-cafe-react-native.herokuapp.com/api';
const baseURLDev = 'http://192.168.0.115:8080/api';

const productosApi = axios.create({ baseURL });


productosApi.interceptors.request.use(

    async (config: any) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {

            config.headers['x-token'] = token;
        }
        return config;
    }
)





export default productosApi;