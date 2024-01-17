import {useFetch} from '@builtbymom/web3/hooks/useFetch';
import {toAddress} from '@builtbymom/web3/utils';
import {useDeepCompareMemo} from '@react-hookz/web';

import {useYDaemonBaseURI} from '../hooks/useYDaemonBaseURI';
import {yDaemonTokensChainSchema} from '../utils/schemas/yDaemonTokensSchema';

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
		const _tokens: TYDaemonTokens = {};
		for (const [chainID, tokensData] of Object.entries(tokens)) {
			for (const [tokenAddress, token] of Object.entries(tokensData)) {
				if (token) {
					_tokens[toAddress(tokenAddress)] = {
						...token,
						chainID: Number(chainID)
					};
				}
			}
		}
		return _tokens;
	}, [tokens]);

	return tokensUpdated;
}

export {useYearnTokens};
