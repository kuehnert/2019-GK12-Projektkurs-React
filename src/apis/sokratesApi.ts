import axios from 'axios';

const sokratesApi = axios.create({
  baseURL: process.env.REACT_APP_SOKRATES_ENDPOINT || 'http://localhost:3000/',
});

export default sokratesApi;
