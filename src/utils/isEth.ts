import { TAddress } from "../types";
import { toAddress } from "./address";
import { ETH_TOKEN_ADDRESS } from "./constants";

export function isEth(address?: string | null | TAddress): boolean {
	return toAddress(address) === toAddress(ETH_TOKEN_ADDRESS);
}
