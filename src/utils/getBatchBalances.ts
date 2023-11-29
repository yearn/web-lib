import {serialize} from 'wagmi';
import {erc20ABI} from '@wagmi/core';

import {toAddress} from './address.js';
import {MULTICALL3_ADDRESS} from './constants.js';
import {decodeAsBigInt, decodeAsNumber, decodeAsString} from './decoder.js';
import {toNormalizedValue} from './format.bigNumber.js';
import {isEth} from './isEth.js';
import {AGGREGATE3_ABI} from './abi/aggregate.abi.js';
import {getClient, getNetwork} from './wagmi/utils.js';

import type {NextApiRequest, NextApiResponse} from 'next';
import type {TUseBalancesTokens} from '../hooks/useBalances.js';
import type {TBalanceData} from '../types/hooks.js';
import type {TDict} from '../types/index.js';

type TPerformCall = {
	chainID: number;
	address: string;
	tokens: TUseBalancesTokens[];
};

export async function getBatchBalances({chainID, address, tokens}: TPerformCall): Promise<TDict<TBalanceData>> {
	const data: TDict<TBalanceData> = {};
	const chunks = [];
	for (let i = 0; i < tokens.length; i += 1_000) {
		chunks.push(tokens.slice(i, i + 1_000));
	}

	for (const chunkTokens of chunks) {
		const calls = [];
		for (const element of chunkTokens) {
			const {token} = element;
			const ownerAddress = toAddress(address);
			if (isEth(token)) {
				const nativeTokenWrapper = getNetwork(chainID)?.contracts?.wrappedToken;
				if (!nativeTokenWrapper) {
					console.error('No native token wrapper found for chainID', chainID);
					continue;
				}

				const multicall3Contract = {address: MULTICALL3_ADDRESS, abi: AGGREGATE3_ABI};
				const baseContract = {address: nativeTokenWrapper.address, abi: erc20ABI};
				calls.push({...multicall3Contract, functionName: 'getEthBalance', args: [ownerAddress]});
				calls.push({...baseContract, functionName: 'decimals'});
				calls.push({...baseContract, functionName: 'symbol'});
				calls.push({...baseContract, functionName: 'name'});
			} else {
				const baseContract = {address: toAddress(token), abi: erc20ABI};
				calls.push({...baseContract, functionName: 'balanceOf', args: [ownerAddress]});
				calls.push({...baseContract, functionName: 'decimals'});
				calls.push({...baseContract, functionName: 'symbol'});
				calls.push({...baseContract, functionName: 'name'});
			}
		}

		try {
			const client = getClient(chainID);
			const multicallInstance = client.multicall;
			const results = await multicallInstance({contracts: calls as never[], batchSize: 4_096});
			let rIndex = 0;
			for (const element of tokens) {
				const {token, decimals: injectedDecimals, name: injectedName, symbol: injectedSymbol} = element;
				const balanceOf = decodeAsBigInt(results[rIndex++]);
				const decimalsIndex = results[rIndex++];
				const decimals =
					decodeAsNumber(decimalsIndex) || Number(decodeAsBigInt(decimalsIndex)) || injectedDecimals || 18;
				let symbol = decodeAsString(results[rIndex++]) || injectedSymbol || '';
				let name = decodeAsString(results[rIndex++]) || injectedName || '';

				if (isEth(token)) {
					const nativeTokenWrapper = getNetwork(chainID)?.contracts?.wrappedToken;
					if (nativeTokenWrapper) {
						symbol = nativeTokenWrapper.coinSymbol;
						name = nativeTokenWrapper.coinName;
					}
				}

				data[toAddress(token)] = {
					decimals: decimals,
					symbol: symbol,
					name: name,
					raw: balanceOf,
					rawPrice: 0n,
					normalized: toNormalizedValue(balanceOf, decimals),
					normalizedPrice: 0,
					normalizedValue: 0
				};
			}
		} catch (error) {
			console.error(error);
			continue;
		}
	}
	return data;
}

export function isArrayOfUseBalancesTokens(value: unknown): value is TUseBalancesTokens[] {
	return (
		Array.isArray(value) &&
		(value as TUseBalancesTokens[]).every(({token}): boolean => Boolean(!!token && typeof token === 'string'))
	);
}

export type TGetBatchBalancesResp = {balances: string; chainID: number};

export async function handler(req: NextApiRequest, res: NextApiResponse<TGetBatchBalancesResp>): Promise<void> {
	const chainID = Number(req.body.chainID);
	const address = String(req.body.address);
	const tokens = isArrayOfUseBalancesTokens(req.body.tokens) ? req.body.tokens : [];

	try {
		const balances = await getBatchBalances({chainID, address, tokens});
		return res.status(200).json({balances: serialize(balances), chainID: req.body.chainID});
	} catch (error) {
		console.error(error, {
			tags: {
				rpc: getNetwork(chainID).defaultRPC,
				chainID,
				address
			}
		});
	}
}
