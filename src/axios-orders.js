import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-2bb36.firebaseio.com/'
});

export default instance;