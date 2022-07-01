import	React		    		from 'react';
import {CodeExample}    		from 'components/CodeExample';
import {Card, Button, Modal}	from '@yearn-finance/web-lib/components';

function	ModalExample(): React.ReactElement {
	const	[isOpen, set_isOpen] = React.useState(false);

	return (
		<CodeExample>
			<Button
				onClick={(): void => set_isOpen(true)}
				className={'min-w-[132px]'}>
				{'Open Modal'}
			</Button>
			<Modal isOpen={isOpen} onClose={(): void => set_isOpen(false)}>
				<Card className={'flex-center'}>
					<Button
						onClick={(): void => set_isOpen(false)}
						className={'min-w-[132px]'}>
						{'Close Modal'}
					</Button>
				</Card>
			</Modal>
		</CodeExample>
	);
}

export {ModalExample};
export default ModalExample;
