// This module provides a superficial validation for new receipts being posted
// It checks to make sure all of the required fields are present in the receipt
// If there are items in the items array (which there should be or else nothing was actually bought), it will make sure the required fields are present
// Using persistent storage, these kinds of validations could be built into a schema definition 
// Using typescript could also be very helpful here

const validateReceipt = (receipt) => {
  let fields = ["retailer", "purchaseDate", "purchaseTime", "items", "total"];
  let itemFields = ["shortDescription", "price"];
  for (let field of fields) {
    if (!(field in receipt)) return false;
  }
  if (receipt.items.length > 0) {
    for (let item of receipt.items) {
      for (let itemField of itemFields) {
        if (!(itemField in item)) {
          return false;
        }
      }
    }
  }
  return true;
};

module.exports = validateReceipt;