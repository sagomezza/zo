import axios from "axios";

const instance = axios.create({
    baseURL: 'https://zonap.test.leancore.co/',
    timeout: 3000,
});

export default instance;