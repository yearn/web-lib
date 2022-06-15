import React, {ReactElement} from 'react';
import Link from 'next/link';
import {SwitchTheme} from '@yearn-finance/web-lib/components';
import {useUI} from '@yearn-finance/web-lib/contexts';
import {SocialTwitter, SocialGithub, SocialDiscord, SocialMedium} from '@yearn-finance/web-lib/icons';

function	Footer(): ReactElement {
	const	{theme, switchTheme} = useUI();

	return (
		<footer className={'hidden flex-row items-center py-8 mx-auto mt-auto w-full max-w-6xl md:flex'}>
			<Link href={'/disclaimer'}>
				<p className={'mr-6 text-xs text-neutral-500 hover:underline transition-colors cursor-pointer hover:text-primary-500'}>{'Disclaimer'}</p>
			</Link>
			<a href={'https://docs.yearn.finance'} target={'_blank'} className={'mr-6 text-xs text-neutral-500 hover:underline transition-colors hover:text-primary-500'} rel={'noreferrer'}>
				{'Documentation'}
			</a>
			<a href={'https://gov.yearn.finance/'} target={'_blank'} className={'mr-6 text-xs text-neutral-500 hover:underline transition-colors hover:text-primary-500'} rel={'noreferrer'}>
				{'Governance forum'}
			</a>
			<a href={'https://github.com/yearn/yearn-security/blob/master/SECURITY.md'} target={'_blank'} className={'mr-6 text-xs text-neutral-500 hover:underline transition-colors hover:text-primary-500'} rel={'noreferrer'}>
				{'Report a vulnerability'}
			</a>

			<div className={'px-2 ml-auto text-neutral-500 transition-colors cursor-pointer hover:text-primary-500'}>
				<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'}>
					<SocialTwitter className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'px-2 text-neutral-500 transition-colors cursor-pointer hover:text-primary-500'}>
				<a href={process.env.PROJECT_GITHUB_URL} target={'_blank'} rel={'noreferrer'}>
					<SocialGithub className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'px-2 text-neutral-500 transition-colors cursor-pointer hover:text-primary-500'}>
				<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'}>
					<SocialDiscord className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'px-2 text-neutral-500 transition-colors cursor-pointer hover:text-primary-500'}>
				<a href={'https://medium.com/iearn'} target={'_blank'} rel={'noreferrer'}>
					<SocialMedium className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'pl-3'}>
				<SwitchTheme theme={theme} switchTheme={switchTheme} />
			</div>
		</footer>
	);
}

export default Footer;
