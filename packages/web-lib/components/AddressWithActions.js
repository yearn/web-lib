import React, { useEffect, useState } from 'react';
import { useSettings } from '@yearn-finance/web-lib/contexts/useSettings';
import { useChainID } from '@yearn-finance/web-lib/hooks/useChainID';
import IconCopy from '@yearn-finance/web-lib/icons/IconCopy';
import IconLinkOut from '@yearn-finance/web-lib/icons/IconLinkOut';
import { toENS } from '@yearn-finance/web-lib/utils/address';
import { copyToClipboard } from '@yearn-finance/web-lib/utils/helpers';
function AddressWithActions(props) {
    const { address, explorer = '', truncate = 5, wrapperClassName, className = '' } = props;
    const { networks } = useSettings();
    const { safeChainID } = useChainID();
    const [explorerURI, set_explorerURI] = useState('');
    useEffect(() => {
        if (explorer !== '') {
            set_explorerURI(explorer);
        }
        else if (networks[safeChainID]?.explorerBaseURI) {
            set_explorerURI(networks[safeChainID].explorerBaseURI);
        }
    }, [safeChainID, explorer, networks]);
    return (React.createElement("span", { className: `yearn--elementWithActions-wrapper ${wrapperClassName}` },
        React.createElement("p", { className: `yearn--elementWithActions ${className}` }, toENS(address, truncate > 0, truncate)),
        React.createElement("button", { className: 'yearn--elementWithActions-copy', onClick: (e) => {
                e.stopPropagation();
                copyToClipboard(address);
            } },
            React.createElement(IconCopy, { className: 'yearn--elementWithActions-icon' })),
        React.createElement("button", { className: 'yearn--elementWithActions-linkout' },
            React.createElement("a", { onClick: (e) => e.stopPropagation(), href: `${explorerURI}/address/${address}`, target: '_blank', className: 'cursor-alias', rel: 'noreferrer' },
                React.createElement("span", { className: 'sr-only' }, 'Link to explorer'),
                React.createElement(IconLinkOut, { className: 'yearn--elementWithActions-icon' })))));
}
export { AddressWithActions };
