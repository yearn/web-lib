import type {TWeb3Provider} from '@yearn-finance/web-lib/contexts/types';

export function isWeb3Provider(provider: TWeb3Provider): provider is TWeb3Provider {
	return provider.getSigner !== undefined;
}
