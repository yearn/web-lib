import {ReactElement} from 'react';

export type TDescriptionListOption = {
	title: string;
	details: string | ReactElement;
};
  
export type TDescriptionList = {
	options: TDescriptionListOption[];
	className?: string;
};
