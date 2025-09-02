
import axios from "axios"

const baseConfig = {
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const baseInstance = () => axios.create(baseConfig);

export default baseInstance;