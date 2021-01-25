import axios from "axios"

export const checkAuthentication = () => {
    const response = axios.get('/api/checkAuthentication');
    return response;
}

export const checkAdmin = async () => {
    const response = await axios.get("/api/checkAdmin");
    return response;
}