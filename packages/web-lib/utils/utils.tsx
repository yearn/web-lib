import {toast} from 'react-hot-toast';
import {ethers} from 'ethers';

import {TDict} from './types';

//cf: https://github.com/ethers-io/ethers.js/discussions/1429
export type	TAddress = '/^0x([0-9a-f][0-9a-f])*$/I'

/* 🔵 - Yearn Finance ******************************************************
** Bunch of function used to format the addresses and work with them to
** always be sure they are correct. An address should not be a string, it
** should be a specific type address, which does not exists, so any address
** should always be called by toAddress(0x...).
**************************************************************************/
export function toAddress(address?: string): TAddress {
	if (!address) {
		return ethers.constants.AddressZero as TAddress;
	}
	if (address === 'GENESIS') {
		return ethers.constants.AddressZero as TAddress;
	}
	try {
		return ethers.utils.getAddress(address) as TAddress;
	} catch (error) {
		return ethers.constants.AddressZero as TAddress;
	}
}

export function toENS(address: string | undefined, format?: boolean, size?: number): string {
	if (!address) {
		return address || '';
	}
	const	_address = toAddress(address);
	const	knownENS = process.env.KNOWN_ENS as unknown as TDict<string>;
	if (knownENS?.[_address]) {
		return knownENS[_address];
	}
	if (format) {
		return (truncateHex(_address, size || 4));
	}
	return address;
}

export function isZeroAddress(address?: string): boolean {
	return toAddress(address) === ethers.constants.AddressZero as TAddress;
}

export function truncateHex(address: string | undefined, size: number): string {
	if (address !== undefined) {
		if (size === 0) {
			return address;
		}
		return `${address.slice(0, size)}...${address.slice(-size)}`;
	}
	if (size === 0) {
		return ethers.constants.AddressZero;
	}
	return '0x000...0000';
}

/* 🔵 - Yearn Finance ******************************************************
** Yearn Meta uses some markdown for some rich content. Instead of using
** a md parser and add some heavy dependencies, just use regex to replace
** the strings to some class and inject that to the code.
**************************************************************************/
export function	parseMarkdown(markdownText: string): string {
	const htmlText = markdownText
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='link' target='_blank' href='$2'>$1</a>")
		.replace(/~~(.*?)~~/gim, "<span class='text-primary-500'>$1</span>")
		.replace(/\*\*(.*?)\*\*/gim, "<span class='font-bold'>$1</span>")
		;

	return htmlText.trim();
}

/* 🔵 - Yearn Finance ******************************************************
** We use the clipboard API in order to copy some data to the user's
** clipboard.
** A toast is displayed to inform the user that the address has been
** copied.
**************************************************************************/
export function	copyToClipboard(value: string, toastMessage = 'Copied to clipboard!'): void {
	navigator.clipboard.writeText(value);
	toast.success(toastMessage);
}

/* 🔵 - Yearn Finance ******************************************************
** Used to slugify a string.
** Src: https://gist.github.com/mathewbyrne/1280286
**************************************************************************/
export function slugify(text: string): string {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w-]+/g, '')        // Remove all non-word chars
		.replace(/--+/g, '-')           // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}

/* 🔵 - Yearn Finance ******************************************************
** Detect is we are running from an Iframe
**************************************************************************/
export function	isIframe(): boolean {
	if (typeof(window) === 'undefined') {
		return false;
	}
	if (window !== window.top || window.parent.frames.length > 0) {
		return true;
	}
	return false;
}
