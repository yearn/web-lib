import {unstable_batchedUpdates} from 'react-dom';

export function performBatchedUpdates(callback: () => void): void {
	unstable_batchedUpdates((): void => {
		callback();
	});
}
