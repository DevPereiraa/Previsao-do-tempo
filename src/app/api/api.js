import axios from "axios";

// Configura a instância do Axios
const api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5", // Base URL da API
});

export default api;
