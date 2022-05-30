import axios from 'axios';

const loginAPI = axios.create({
    baseURL:'http://202.193.53.235:8080/user/login?name=jianhgao3&password=123456',
    timeout: 1000 * 100
});

// export default http;
