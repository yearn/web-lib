import {waitForTransaction, writeContract} from '@wagmi/core';

import type React from 'react';
import type {BaseError, TransactionReceipt} from 'viem';
import type {Connector} from 'wagmi';
import type {PrepareWriteContractResult} from '@wagmi/core';
import { yToast } from '../../components/yToast';

const timeout = 3000;
const defaultTxStatus = {none: true, pending: false, success: false, error: false};
const errorTxStatus = {none: false, pending: false, success: false, error: true};
const pendingTxStatus = {none: false, pending: true, success: false, error: false};
const successTxStatus = {none: false, pending: false, success: true, error: false};

export type	TTxStatus = {
	none: boolean,
	pending: boolean,
	success: boolean,
	error: boolean,
	errorMessage?: string
}
export type TBaseError = {
	name?: string,
	message: string,
}
export type TTxResponse = {
	isSuccessful: boolean,
	receipt?: TransactionReceipt,
	error?: BaseError | unknown
};

class Transaction {
	provider: Connector;
	onStatus: React.Dispatch<React.SetStateAction<TTxStatus>>;
	options?: {shouldIgnoreSuccessTxStatusChange: boolean};
	txArgs?: unknown[];
	funcCall: (provider: Connector, ...rest: never[]) => Promise<TTxResponse>;
	successCall?: (receipt?: TransactionReceipt) => Promise<void>;

	constructor(
		provider: Connector,
		funcCall: (provider: Connector, ...rest: never[]) => Promise<TTxResponse>,
		onStatus: React.Dispatch<React.SetStateAction<TTxStatus>>,
		options?: {shouldIgnoreSuccessTxStatusChange: boolean}
	) {
		this.provider = provider;
		this.funcCall = funcCall;
		this.onStatus = onStatus;
		this.options = options;
	}

	populate(...txArgs: unknown[]): Transaction {
		this.txArgs = txArgs;
		return this;
	}

	onSuccess(onSuccess: (receipt?: TransactionReceipt) => Promise<void>): Transaction {
		this.successCall = onSuccess;
		return this;
	}

	onHandleError(error: string): void {
		const {toast} = yToast();
		toast({content: error, type: 'error'});
		this.onStatus(errorTxStatus);
		setTimeout((): void => this.onStatus(defaultTxStatus), timeout);
	}

	async perform(): Promise<TTxResponse> {
		this.onStatus(pendingTxStatus);
		try {
			const args = (this.txArgs || []) as never[];
			const {isSuccessful, receipt, error} = await this.funcCall(this.provider, ...args);
			if (isSuccessful) {
				if (this.successCall && receipt) {
					await this.successCall(receipt);
				}
				const {toast} = yToast();
				toast({content: 'Transaction successful', type: 'success'});
				if (this?.options?.shouldIgnoreSuccessTxStatusChange) {
					return {isSuccessful, receipt};
				}
				this.onStatus(successTxStatus);
				setTimeout((): void => this.onStatus(defaultTxStatus), timeout);
				return ({isSuccessful, receipt});
			}
			this.onHandleError((error as TBaseError)?.message || 'Transaction failed');
			return ({isSuccessful: false});
		} catch(error) {
			const err = error as BaseError;
			this.onHandleError(err?.shortMessage || err?.message || 'Transaction failed');
			return ({isSuccessful: false});
		}
	}
}

async function handleTx(config: PrepareWriteContractResult): Promise<TTxResponse> {
	try {
		const {hash} = await writeContract(config.request);
		const receipt = await waitForTransaction({
			chainId: config.request.chainId,
			hash: hash
		});
		return {isSuccessful: true, receipt};
	} catch (error) {
		console.error(error);
		return {isSuccessful: false, error: error};
	}
}

export { defaultTxStatus, handleTx as handleTx2, Transaction };
