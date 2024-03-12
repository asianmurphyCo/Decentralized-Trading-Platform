/**
 * 
 * @param {string} chainIdHex 
 * @returns 
 */

export const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
};