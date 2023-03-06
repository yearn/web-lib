import type {TWeb3Provider} from '@yearn-finance/web-lib/contexts/types';
import type {TBrowserProvider} from '@yearn-finance/web-lib/types';

export function isWeb3Provider(provider: TWeb3Provider): provider is TWeb3Provider {
	return (provider as TBrowserProvider).getSigner !== undefined;
}
