import {request} from 'graphql-request';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function lensProtocolFetcher(query: string): Promise<any> {
	return request('https://api.lens.dev/playground', query);
}
