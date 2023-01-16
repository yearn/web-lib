import React, { useEffect, useState } from 'react';
import { useSettings } from '@yearn-finance/web-lib/contexts/useSettings';
import { useChainID } from '@yearn-finance/web-lib/hooks/useChainID';
import IconCopy from '@yearn-finance/web-lib/icons/IconCopy';
import IconLinkOut from '@yearn-finance/web-lib/icons/IconLinkOut';
import { truncateHex } from '@yearn-finance/web-lib/utils/address';
import { copyToClipboard } from '@yearn-finance/web-lib/utils/helpers';
function TxHashWithActions(props) {
    const { txHash, explorer = '', truncate = 5, wrapperClassName, className = '' } = props;
    const { networks } = useSettings();
    const [explorerURI, set_explorerURI] = useState('');
    const { safeChainID } = useChainID();
    useEffect(() => {
        if (explorer !== '') {
            set_explorerURI(explorer);
        }
        else if (networks[safeChainID]?.explorerBaseURI) {
            set_explorerURI(networks[safeChainID].explorerBaseURI);
        }
    }, [safeChainID, explorer, networks]);
    return (React.createElement("span", { className: `yearn--elementWithActions-wrapper ${wrapperClassName}` },
        React.createElement("p", { className: `yearn--elementWithActions ${className}` }, truncateHex(txHash, truncate)),
        React.createElement("button", { className: 'yearn--elementWithActions-copy', onClick: (e) => {
                e.stopPropagation();
                copyToClipboard(txHash);
            } },
            React.createElement(IconCopy, { className: 'yearn--elementWithActions-icon' })),
        React.createElement("button", { className: 'yearn--elementWithActions-linkout' },
            React.createElement("a", { onClick: (e) => e.stopPropagation(), href: `${explorerURI}/tx/${txHash}`, target: '_blank', className: 'cursor-alias', rel: 'noreferrer' },
                React.createElement("span", { className: 'sr-only' }, 'Link to explorer'),
                React.createElement(IconLinkOut, { className: 'yearn--elementWithActions-icon' })))));
}
export { TxHashWithActions };
