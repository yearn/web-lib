import {useFetch} from '@builtbymom/web3/hooks/useFetch';
import {toAddress} from '@builtbymom/web3/utils';
import {useDeepCompareMemo} from '@react-hookz/web';

import {useYDaemonBaseURI} from '../hooks/useYDaemonBaseURI';
import {yDaemonTokensChainSchema} from '../utils/schemas/yDaemonTokensSchema';

import type {TNDict} from '@builtbymom/web3/types';
import type {TYDaemonTokens, TYDaemonTokensChain} from '../utils/schemas/yDaemonTokensSchema';

function useYearnTokens(): TYDaemonTokens {
	const {yDaemonBaseUri: yDaemonBaseUriWithoutChain} = useYDaemonBaseURI();
	const {data: tokens} = useFetch<TYDaemonTokensChain>({
		endpoint: `${yDaemonBaseUriWithoutChain}/tokens/all`,
		schema: yDaemonTokensChainSchema
	});

	const tokensUpdated = useDeepCompareMemo((): TYDaemonTokens => {
		if (!tokens) {
			return {};
		}
		const _tokens: TNDict<TYDaemonTokens> = {};
		for (const [chainIDStr, tokensData] of Object.entries(tokens)) {
			for (const [tokenAddress, token] of Object.entries(tokensData)) {
				const chainID = Number(chainIDStr);
				if (token) {
					if (_tokens[chainID] === undefined) {
						_tokens[chainID] = {};
					}
					_tokens[chainID][toAddress(tokenAddress)] = {...token, chainID};
				}
			}
		}
		return _tokens;
	}, [tokens]);

	return tokensUpdated;
}

export {useYearnTokens};
