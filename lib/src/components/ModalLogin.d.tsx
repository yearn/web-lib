export type	TModalLogin = {
	isOpen: boolean;
	set_isOpen: React.Dispatch<React.SetStateAction<boolean>>;
	connect: (_providerType: number) => Promise<void>;
	walletType: {[key: string]: number};
};
