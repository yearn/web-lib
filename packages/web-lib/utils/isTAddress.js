export function isTAddress(address) {
    const regex = /^0x([0-9a-f][0-9a-f])*$/i;
    return !!address && regex.test(address);
}
