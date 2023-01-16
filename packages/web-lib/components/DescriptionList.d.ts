import type { ReactElement } from 'react';
export type TDescriptionListOption = {
    title: string;
    details: string | ReactElement;
};
export type TDescriptionList = {
    options: TDescriptionListOption[];
    className?: string;
};
declare function DescriptionList(props: TDescriptionList): ReactElement;
export { DescriptionList };
