import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-bluspot-worker.cloudfunctions.net',
    timeout: 3000,
});

export default instance;