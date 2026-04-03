const crypto = require('crypto');
const fs = require('fs');

/**
 * Simulates finding the hash of a file or buffer.
 * In a real blockchain, this hash would be signed and appended to a smart contract.
 * Here, we simply ensure immutability by comparing the sha256.
 */
function generateHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

module.exports = {
  generateHash
};
