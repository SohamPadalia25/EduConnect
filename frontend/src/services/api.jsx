import axios from 'axios';

const API = axios.create({
//   baseURL: 'http://localhost:8000/api',
  baseURL: 'https://educonnect-imfb.onrender.com/api',
  withCredentials: true,
});
// const API = axios.create({
//   baseURL: 'https://finsyte.onrender.com/api',


// });

export default API;
