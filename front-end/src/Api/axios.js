import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://amazon-clone-10.onrender.com',
})

export { instance };