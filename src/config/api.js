import axios from 'axios';

export default axios.create({
    baseURL: 'https://college-api-mo.herokuapp.com/api'
});