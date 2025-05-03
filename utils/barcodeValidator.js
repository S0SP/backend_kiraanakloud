/**
 * Validates if the provided string is a valid barcode format
 * This is a simple implementation that can be expanded based on specific requirements
 * 
 * @param {string} barcode - The barcode to validate
 * @returns {boolean} - Whether the barcode is valid
 */
const isValidBarcode = (barcode) => {
  // Basic validation - check if barcode is a string with digits only
  if (!barcode || typeof barcode !== 'string') {
    return false;
  }
  
  // Common barcode formats often have specific lengths and digit-only values
  // Here we're doing a simple check that can be expanded based on requirements
  return /^\d+$/.test(barcode) && barcode.length >= 8 && barcode.length <= 14;
};

module.exports = {
  isValidBarcode
}; 