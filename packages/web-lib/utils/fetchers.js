import request from 'graphql-request';
import axios from 'axios';
export async function curveFetcher(url) {
    return axios.get(url).then((res) => res.data?.data);
}
export async function baseFetcher(url) {
    return axios.get(url).then((res) => res.data);
}
export async function graphFetcher(url, query) {
    return request(url, query);
}
