/**
 * 
 * @param {string} rawBalance 
 *  
 */

export const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(4);
    return balance;
};