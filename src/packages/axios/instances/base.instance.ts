
import axios from "axios"

const baseConfig = {
  baseURL: 'http://localhost:3001/',
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const baseInstance = () => axios.create(baseConfig);

export default baseInstance;