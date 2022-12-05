import axios from 'axios';

export default axios.create({
    baseURL: 'https://college-api.vercel.app/api'
});