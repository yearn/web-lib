import {unstable_batchedUpdates} from 'react-dom';

function performBatchedUpdates(callback: () => void): void {
	unstable_batchedUpdates((): void => {
		callback();
	});
}

export default performBatchedUpdates;
