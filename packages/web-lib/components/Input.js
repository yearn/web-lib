import React, { useRef } from 'react';
import { ethers } from 'ethers';
import { toSafeValue } from '@yearn-finance/web-lib/utils/format';
import { formatToNormalizedValue } from '@yearn-finance/web-lib/utils/format.bigNumber';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';
import { formatAmount } from '../utils/format.number';
function InputBase(props) {
    const { value, onChange, onSearch, ariaLabel = 'Search', withMax, onMaxClick, className, ...rest } = props;
    const focusRef = useRef(null);
    return (React.createElement("form", { name: ariaLabel, onSubmit: (e) => {
            e.preventDefault();
            if (onSearch) {
                onSearch(value);
            }
        } },
        React.createElement("div", { "aria-label": ariaLabel, className: `yearn--input-field-wrapper ${className}` },
            React.createElement("span", { className: 'sr-only' }, ariaLabel),
            React.createElement("input", { ref: focusRef, value: value, onChange: (e) => onChange(e.target.value), type: props.type || 'text', className: 'yearn--input-field', ...rest }),
            withMax ? (React.createElement("div", { className: 'yearn--input-max', onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (onMaxClick) {
                        onMaxClick();
                        if (focusRef.current) {
                            focusRef.current.blur();
                        }
                    }
                } }, 'Max')) : null)));
}
function InputBigNumber(props) {
    const { value, onSetValue, onValueChange, maxValue = ethers.constants.Zero, withMax = true, decimals = 18, balance = '', price = 0 } = props;
    function onChange(s) {
        performBatchedUpdates(() => {
            onSetValue(s);
            if (onValueChange) {
                onValueChange(s);
            }
        });
    }
    const safeValue = toSafeValue(value);
    return (React.createElement("label", { "aria-invalid": withMax && (safeValue !== 0 && (safeValue > formatToNormalizedValue(maxValue, decimals))), className: 'yearn--input' },
        React.createElement("p", null, `You have ${balance}`),
        React.createElement(Input, { value: value, type: 'number', min: 0, onChange: (s) => onChange(s), onSearch: (s) => onChange(s), placeholder: '0.00000000', max: formatToNormalizedValue(maxValue, decimals), onMaxClick: () => {
                if (!maxValue.isZero()) {
                    onChange(formatToNormalizedValue(maxValue, decimals).toString());
                }
            }, withMax: withMax, disabled: props.disabled }),
        React.createElement("p", null, `$ ${formatAmount(safeValue * price, 2, 2)}`)));
}
InputBase.BigNumber = InputBigNumber;
export const Input = InputBase;
