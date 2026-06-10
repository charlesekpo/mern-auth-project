import axios from 'axios';

const API = axios.createContext({
    baseURL: 'http://localhost:5000/api/auth',

    // axios need to send cookie on every request, else my protect middleware will block it.
    withCredentials: true
});

export default API;