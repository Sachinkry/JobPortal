import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthHeader = (username: string, password: string) => {
    const encodedCredentials = btoa(`${username}:${password}`);
    api.defaults.headers.common['Authorization'] = `Basic ${encodedCredentials}`;
    console.log('Set Authorization header:', api.defaults.headers.common['Authorization']);
};

export const clearAuthHeader = () => {
    delete api.defaults.headers.common['Authorization'];
};

export default api;