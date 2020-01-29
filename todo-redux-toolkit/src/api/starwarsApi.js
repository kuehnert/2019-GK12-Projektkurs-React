import axios from 'axios';

const starwarsApi = axios.create({
  baseURL: process.env.REACT_APP_STARWARS_ENDPOINT || 'http://localhost:5000/',
});

export default starwarsApi;
