import axios from 'axios';

const api = axios.create({
  baseURL: 'https://datausa.io/api',
});

export default api;