import { Connector } from '@web3-react/types';
import type { Actions, Provider } from '@web3-react/types';
export declare class EIP1193 extends Connector {
    provider: Provider | undefined;
    constructor({ actions, provider }: {
        actions: Actions;
        provider?: Provider;
    });
    init(provider: Provider): void;
    connectEagerly(): Promise<void>;
    activate(): Promise<void>;
}
