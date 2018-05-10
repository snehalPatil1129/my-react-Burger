import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-680dd.firebaseio.com/'
});

export default instance;