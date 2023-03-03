const calcPoints = (receipt) => {
  let namePoints = getNamePoints(receipt);
  let roundDollarTotalPoints = getRoundDollarPoints(receipt);
  let multipleOfQuarterPoints = getMultipleOfQuarterPoints(receipt);
  let pairsPoints = getPairsPoints(receipt);

  return (
    namePoints + roundDollarTotalPoints + multipleOfQuarterPoints + pairsPoints
  );
};

// One point for every alphanumeric character in the retailer name.
const getNamePoints = (receipt) => {
  const alphaNums =
    "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789";

  let count = 0;
  for (let char of receipt.retailer) {
    if (alphaNums.includes(char)) {
      count += 1;
    }
  }
  return count;
};
// 50 points if the total is a round dollar amount with no cents.
const getRoundDollarPoints = (receipt) => {
  let total = Number(receipt.total);
  if (total % 1 !== 0) {
    return 0;
  }

  return 50;
};
// 25 points if the total is a multiple of 0.25.
const getMultipleOfQuarterPoints = (receipt) => {
  let total = Number(receipt.total);
  if (total % 0.25 == 0) return 25;
  return 0;
};
// 5 points for every two items on the receipt.
const getPairsPoints = (receipt) => {
  let numPairs = Math.floor(receipt.items.length / 2);
  let points = numPairs * 5;
  return points;
};
let r1 = {
  retailer: "Target",
  purchaseDate: "2022-01-01",
  purchaseTime: "13:01",
  items: [
    {
      shortDescription: "Mountain Dew 12PK",
      price: "6.49",
    },
    {
      shortDescription: "Emils Cheese Pizza",
      price: "12.25",
    },
    {
      shortDescription: "Knorr Creamy Chicken",
      price: "1.26",
    },
    {
      shortDescription: "Doritos Nacho Cheese",
      price: "3.35",
    },
    {
      shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
      price: "12.00",
    },
  ],
  total: "35.35",
};

let r2 = {
  retailer: "M&M Corner Market",
  purchaseDate: "2022-03-20",
  purchaseTime: "14:33",
  items: [
    {
      shortDescription: "Gatorade",
      price: "2.25",
    },
    {
      shortDescription: "Gatorade",
      price: "2.25",
    },
    {
      shortDescription: "Gatorade",
      price: "2.25",
    },
    {
      shortDescription: "Gatorade",
      price: "2.25",
    },
  ],
  total: "9.00",
};

console.log(calcPoints(r1));
// calcPoints(r2);
