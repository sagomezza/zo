import axios from "axios";

const instance = axios.create({
    baseURL: 'http://zonap.us-east-1.elasticbeanstalk.com',
    timeout: 3000,
});

export default instance;