import	React		    from 'react';
import {CodeExample}    from 'components/CodeExample';
import {Alert}    from '@yearn-finance/web-lib/components';

function	AlertBannerExample(): React.ReactElement {
	const	[isVisible, set_isVisible] = React.useState(true);

	return (
		<CodeExample>
			<div className={'w-3/4'}>
				<Alert.Banner
					isVisible={isVisible}
					title={'Spend your time wisely'}
					onClose={(): void => {
						set_isVisible(false);
						setTimeout((): void => set_isVisible(true), 3000);
					}}>
					<div>
						<p>{'Yearn Vaults are a way to use technology to help manage your holdings. You choose the strategy that best suits you, deposit into that vault, and Yearn tech helps maximize yield through shifting capital, auto-compounding, and rebalancing.'}</p>
						<p className={'block mt-4'}>{'Custody, and responsibility, for your holdings remains yours.'}</p>
						<p className={'block mt-4'}>{'You can withdraw anytime.'}</p>
					</div>
				</Alert.Banner>
			</div>
		</CodeExample>
	);
}

export {AlertBannerExample};
export default AlertBannerExample;