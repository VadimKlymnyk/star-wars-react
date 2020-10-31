import axios from 'axios';

const BASE_PATH = 'https://swapi.dev/api/';

export async function getPlanets(path) {
    try {
        const response = await axios.get(BASE_PATH+path);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (e) {
        throw e
    }
}

export async function getPeople(path) {
    try {
        const response = await axios.get(path);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (e) {
        throw e
    }
}