import axios from 'axios';

const ferienApi = axios.create({
  baseURL: 'https://ferien-api.de/api/v1/',
});

// holidays/{statecode}, NW
export default ferienApi;
