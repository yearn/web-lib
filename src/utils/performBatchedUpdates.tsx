import ReactDOM from 'react-dom';

function performBatchedUpdates(callback: () => void): void {
	ReactDOM.unstable_batchedUpdates((): void => {
		callback();
	});
}

export default performBatchedUpdates;
