import axios from 'axios'
import jwt_decode from 'jwt-decode'
const BASE_URL = "http://localhost:5000/api/v1/"

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

const jwtAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})


axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const date = new Date()
    const decodedToken = jwt_decode(accessToken)
    if (decodedToken.exp < date.getTime() / 1000) {
      const res = await jwtAxios.post(`auth/refresh-token/`);
      const newAccessToken = res.data.token
      localStorage.setItem('accessToken', newAccessToken)
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});


axiosClient.interceptors.response.use((res) => res.data)

export default axiosClient