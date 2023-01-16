import { unstable_batchedUpdates } from 'react-dom';
function performBatchedUpdates(callback) {
    unstable_batchedUpdates(() => {
        callback();
    });
}
export default performBatchedUpdates;
