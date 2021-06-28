import axios from "axios";

export default axios.create({
    baseURL: "https://api.pexels.com",
    withCredentials: false,
    headers: {
        Authorization: '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        crossorigin: true
    //         'Access-Control-Expose-Headers': 'Content-Length, X-JSON',
    //         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    //         'Access-Control-Allow-Headers': '*'
    }
});