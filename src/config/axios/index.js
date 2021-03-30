import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-zona-p-test.cloudfunctions.net',
    timeout: 3000,
});

export default instance;