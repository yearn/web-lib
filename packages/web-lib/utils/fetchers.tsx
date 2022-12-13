import request from 'graphql-request';
import axios from 'axios';

import type {AxiosResponse} from 'axios';
import type {GraphQLResponse} from 'graphql-request/dist/types';

export const baseFetcher = async (url: string): Promise<AxiosResponse> => axios.get(url).then((res): AxiosResponse => res.data);
export const graphFetcher = async (url: string, query: string): Promise<GraphQLResponse> => request(url, query);
