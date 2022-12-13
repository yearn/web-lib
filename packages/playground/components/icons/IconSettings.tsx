import	React	from	'react';

import type {ReactElement} from 'react';

function	IconSettings(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg
			width={'24'}
			height={'24'}
			xmlns={'http://www.w3.org/2000/svg'}
			viewBox={'0 0 24 24'}
			{...props}>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={'M11.8765 10C10.785 10 9.89897 10.8955 9.89897 12C9.89897 13.1045 10.785 14 11.8765 14C12.9688 14 13.8541 13.1047 13.8541 12C13.8541 10.8953 12.9688 10 11.8765 10ZM7.92142 12C7.92142 9.7905 9.69323 8 11.8765 8C14.061 8 15.8316 9.79072 15.8316 12C15.8316 14.2093 14.061 16 11.8765 16C9.69323 16 7.92142 14.2095 7.92142 12Z'}
				fill={'currentcolor'}/>
			<path
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d={'M8.86666 1.94985C9.05163 0.82571 10.012 0 11.1403 0H12.8588C13.9876 0 14.9483 0.825253 15.1334 1.94985L15.4209 3.69936C16.1275 3.99848 16.7864 4.38688 17.3858 4.85052L19.0263 4.22778C20.0819 3.82809 21.2681 4.25953 21.8317 5.24557L21.8323 5.24671L22.6916 6.75471C23.2532 7.7405 23.0313 8.99651 22.1597 9.72211L20.8116 10.8462C20.9063 11.6061 20.9064 12.393 20.8116 13.1538L22.1597 14.2779C23.0313 15.0035 23.2533 16.2595 22.6916 17.2453L21.8323 18.7533L21.8317 18.7544C21.2681 19.7405 20.0827 20.1722 19.0271 19.7725L17.3858 19.1495C16.7861 19.6131 16.1272 20.001 15.421 20.3003L15.1334 22.05C14.9484 23.1746 13.9876 24 12.8588 24H11.1403C10.012 24 9.05163 23.1743 8.86666 22.0501L8.5791 20.3007C7.87263 20.0017 7.21334 19.6133 6.61397 19.1496L4.9737 19.7722C3.91894 20.1716 2.73067 19.7413 2.16772 18.7533L1.30848 17.2453C0.746906 16.2597 0.968654 15.0041 1.83865 14.2785L3.18769 13.1543C3.0919 12.3932 3.09202 11.606 3.18769 10.8457L1.83896 9.72174C0.968964 8.99612 0.746899 7.74032 1.30847 6.75472L2.16771 5.24672C2.73066 4.25872 3.91816 3.82811 4.97292 4.22748L6.61397 4.85043C7.21334 4.38666 7.87263 3.99833 8.5791 3.69933L8.86666 1.94985ZM10.8174 2.27815L10.4367 4.59398C10.377 4.95731 10.1247 5.25802 9.7799 5.37668C8.91452 5.67453 8.12669 6.14127 7.45196 6.74044C7.17788 6.98383 6.79358 7.05485 6.45211 6.92522L4.27956 6.10052C4.13005 6.04402 3.96087 6.10535 3.88114 6.24528L3.0219 7.75328C2.94084 7.89555 2.97406 8.07584 3.09654 8.17826L5.34014 10.048L5.22404 10.6351C5.05007 11.5148 5.04974 12.4835 5.22404 13.3649C5.29552 13.7264 5.16456 14.0983 4.88326 14.3327L3.09685 15.8215C2.97412 15.9239 2.94077 16.1043 3.02189 16.2467L3.88114 17.7547C3.96079 17.8945 4.12956 17.9559 4.27897 17.8997L6.45211 17.0748C6.79358 16.9452 7.17788 17.0162 7.45196 17.2596C8.12669 17.8587 8.91452 18.3255 9.7799 18.6233C10.1247 18.742 10.377 19.0427 10.4367 19.406L10.8174 21.7218C10.8441 21.8836 10.9813 22 11.1403 22H12.8588C13.0192 22 13.156 21.8833 13.1826 21.722L13.5633 19.406C13.623 19.043 13.875 18.7425 14.2193 18.6236C15.0855 18.3246 15.8727 17.8585 16.5486 17.2591C16.8226 17.0161 17.2067 16.9452 17.5479 17.0748L19.7205 17.8995C19.8689 17.9553 20.0381 17.8955 20.1192 17.7542L20.9781 16.2467C21.0592 16.1045 21.026 15.9245 20.903 15.8221L19.1166 14.3326C18.8359 14.0986 18.705 13.7276 18.7756 13.3668C18.9484 12.4842 18.9481 11.5142 18.7756 10.6332C18.705 10.2724 18.8359 9.90144 19.1166 9.66743L20.9023 8.17843C21.0253 8.07602 21.0592 7.8955 20.9782 7.75329L20.1196 6.24643C20.0383 6.10491 19.8692 6.04433 19.7207 6.10044L17.5479 6.92522C17.2067 7.05477 16.8226 6.98392 16.5486 6.74086C15.8723 6.14109 15.0852 5.67441 14.2201 5.37668C13.8754 5.25802 13.623 4.95731 13.5633 4.59399L13.1827 2.27815C13.156 2.11683 13.0192 2 12.8588 2H11.1403C10.9813 2 10.8441 2.11638 10.8174 2.27815Z'}
				fill={'currentcolor'}/>
		</svg>
	);
}

export default IconSettings;
