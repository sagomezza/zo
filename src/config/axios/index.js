import axios from "axios";

const instance = axios.create({
    baseURL: 'http://zonaptest2-env.eba-4fv5f7v4.us-east-1.elasticbea',
    timeout: 3000,
});

export default instance;