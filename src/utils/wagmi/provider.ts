import {toast} from 'react-hot-toast';
import assert from 'assert';
import {BaseError} from 'viem';
import {prepareWriteContract, waitForTransaction, writeContract} from '@wagmi/core';

import {toBigInt} from '../format.bigNumber.js';
import {defaultTxStatus} from '../web3/transaction.js';
import {assertAddress} from './utils.js';

import type {Abi, SimulateContractParameters} from 'viem';
import type {Connector} from 'wagmi';
import type {GetWalletClientResult, WalletClient} from '@wagmi/core';
import type {TAddress} from '../../types/index.js';
import type {TTxResponse} from '../web3/transaction.js';

export type TWagmiProviderContract = {
	walletClient: GetWalletClientResult,
	chainId: number,
	address: TAddress,
}
export async function toWagmiProvider(connector: Connector | undefined): Promise<TWagmiProviderContract> {
	assert(connector, 'Connector is not set');

	const signer = await connector.getWalletClient();
	const chainId = await connector.getChainId();
	const {address} = signer.account;
	return ({
		walletClient: signer,
		chainId,
		address
	});
}

export type TWriteTransaction = {
	connector: Connector | undefined;
	contractAddress: TAddress | undefined;
	statusHandler?: (status: typeof defaultTxStatus) => void;
	onTrySomethingElse?: () => Promise<TTxResponse>; //When the abi is incorrect, ex: usdt, we may need to bypass the error and try something else
}

type TPrepareWriteContractConfig<
	TAbi extends Abi | readonly unknown[] = Abi,
	TFunctionName extends string = string
> = Omit<SimulateContractParameters<TAbi, TFunctionName>, 'chain' | 'address'> & {
	chainId?: number
	walletClient?: WalletClient
	address: TAddress | undefined
}
export async function handleTx<
	TAbi extends Abi | readonly unknown[],
	TFunctionName extends string
>(
	args: TWriteTransaction,
	props: TPrepareWriteContractConfig<TAbi, TFunctionName>
): Promise<TTxResponse> {
	args.statusHandler?.({...defaultTxStatus, pending: true});
	const wagmiProvider = await toWagmiProvider(args.connector);

	assertAddress(props.address, 'contractAddress');
	assertAddress(wagmiProvider.address, 'userAddress');
	try {
		const config = await prepareWriteContract({
			...wagmiProvider,
			...props as TPrepareWriteContractConfig,
			address: props.address,
			value: toBigInt(props.value)
		});
		const {hash} = await writeContract(config.request);
		const receipt = await waitForTransaction({chainId: wagmiProvider.chainId, hash, confirmations: 2});
		if (receipt.status === 'success') {
			args.statusHandler?.({...defaultTxStatus, success: true});
		} else if (receipt.status === 'reverted') {
			args.statusHandler?.({...defaultTxStatus, error: true});
		}
		toast.success('Transaction successful!');
		return ({isSuccessful: receipt.status === 'success', receipt});
	} catch (error) {
		if (!(error instanceof BaseError)) {
			return ({isSuccessful: false, error});
		}

		if (args.onTrySomethingElse) {
			if (error.name === 'ContractFunctionExecutionError') {
				return await args.onTrySomethingElse();
			}
		}

		toast.error(error.shortMessage);
		args.statusHandler?.({...defaultTxStatus, error: true});
		console.error(error);
		return ({isSuccessful: false, error});
	} finally {
		setTimeout((): void => {
			args.statusHandler?.({...defaultTxStatus});
		}, 3000);
	}
}
