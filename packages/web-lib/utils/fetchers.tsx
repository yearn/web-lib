import request from 'graphql-request';
import axios from 'axios';

export async function curveFetcher<T>(url: string): Promise<T> {
	return axios.get(url).then((res): T => res.data?.data);
}

export async function baseFetcher<T>(url: string): Promise<T> {
	return axios.get(url).then((res): T => res.data);
}

export async function graphFetcher<T>(url: string, query: string): Promise<T> {
	return request(url, query);
}