# @yearn/web-lib

## 0.8.0

### Minor Changes

- bba7001: Update the way TxHashWithActions and AddressWithActions works, removing the default explorer argument value and using the combinaison of networks from useSettings and chainID from useWeb3 to determine the correct explorer address. If the explorer param is not empty, this will override the automatic assignation.
