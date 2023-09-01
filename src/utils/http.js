import axios from "axios";

const httpInstance = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 5000
})
export default httpInstance