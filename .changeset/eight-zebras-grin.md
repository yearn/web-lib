---
"@yearn/web-lib": minor
---

Update the way TxHashWithActions and AddressWithActions works, removing the default explorer argument value and using the combinaison of networks from useSettings and chainID from useWeb3 to determine the correct explorer address. If the explorer param is not empty, this will override the automatic assignation.
