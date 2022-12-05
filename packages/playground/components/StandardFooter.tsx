import React from 'react';
import Link from 'next/link';
import {SwitchTheme} from '@yearn-finance/web-lib/components';
import {useUI} from '@yearn-finance/web-lib/contexts';
import {SocialDiscord, SocialGithub, SocialMedium, SocialTwitter} from '@yearn-finance/web-lib/icons';

import type {ReactElement} from 'react';

function	Footer(): ReactElement {
	const	{theme, switchTheme} = useUI();

	return (
		<footer className={'mx-auto mt-auto hidden w-full max-w-6xl flex-row items-center py-8 md:flex'}>
			<Link href={'/disclaimer'}>
				<p className={'mr-6 cursor-pointer text-xs text-neutral-500 transition-colors hover:text-primary-500 hover:underline'}>{'Disclaimer'}</p>
			</Link>
			<a
				href={'https://docs.yearn.finance'}
				target={'_blank'}
				className={'mr-6 text-xs text-neutral-500 transition-colors hover:text-primary-500 hover:underline'}
				rel={'noreferrer'}>
				{'Documentation'}
			</a>
			<a
				href={'https://gov.yearn.finance/'}
				target={'_blank'}
				className={'mr-6 text-xs text-neutral-500 transition-colors hover:text-primary-500 hover:underline'}
				rel={'noreferrer'}>
				{'Governance forum'}
			</a>
			<a
				href={'https://github.com/yearn/yearn-security/blob/master/SECURITY.md'}
				target={'_blank'}
				className={'mr-6 text-xs text-neutral-500 transition-colors hover:text-primary-500 hover:underline'}
				rel={'noreferrer'}>
				{'Report a vulnerability'}
			</a>

			<div className={'ml-auto cursor-pointer px-2 text-neutral-500 transition-colors hover:text-primary-500'}>
				<a
					href={'https://twitter.com/iearnfinance'}
					target={'_blank'}
					rel={'noreferrer'}>
					<SocialTwitter className={'h-5 w-5'} />
				</a>
			</div>
			<div className={'cursor-pointer px-2 text-neutral-500 transition-colors hover:text-primary-500'}>
				<a
					href={process.env.PROJECT_GITHUB_URL}
					target={'_blank'}
					rel={'noreferrer'}>
					<SocialGithub className={'h-5 w-5'} />
				</a>
			</div>
			<div className={'cursor-pointer px-2 text-neutral-500 transition-colors hover:text-primary-500'}>
				<a
					href={'https://discord.yearn.finance/'}
					target={'_blank'}
					rel={'noreferrer'}>
					<SocialDiscord className={'h-5 w-5'} />
				</a>
			</div>
			<div className={'cursor-pointer px-2 text-neutral-500 transition-colors hover:text-primary-500'}>
				<a
					href={'https://medium.com/iearn'}
					target={'_blank'}
					rel={'noreferrer'}>
					<SocialMedium className={'h-5 w-5'} />
				</a>
			</div>
			<div className={'pl-3'}>
				<SwitchTheme theme={theme} switchTheme={switchTheme} />
			</div>
		</footer>
	);
}

export default Footer;
