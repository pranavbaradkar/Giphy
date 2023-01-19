import axios from "axios"
import { API_KEY } from './../constant';

export const getTrendingGifs = (params) => {
    return (axios.get(`https://api.giphy.com/v1/gifs/trending`, {params}));
}

export const getSearchGifs = (params) => {
    return (axios.get(`https://api.giphy.com/v1/gifs/search`, {params}));
}