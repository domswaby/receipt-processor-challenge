const calcPoints = (receipt) => {
  let namePoints = getNamePoints(receipt);
  let roundDollarTotalPoints = getRoundDollarPoints(receipt);
  let multipleOfQuarterPoints = getMultipleOfQuarterPoints(receipt);
  let pairsPoints = getPairsPoints(receipt);
  let trimmedLengthPoints = getTrimmedLengthPoints(receipt);
  let oddDayPoints = getOddDayPoints(receipt);
  let purchaseTimePoints = getPurchaseTimePoints(receipt);

  return (
    namePoints +
    roundDollarTotalPoints +
    multipleOfQuarterPoints +
    pairsPoints +
    trimmedLengthPoints +
    oddDayPoints +
    purchaseTimePoints
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
// If the trimmed length of the item description is a multiple of 3,
// multiply the price by 0.2 and round up to the nearest integer.
// The result is the number of points earned.
const getTrimmedLengthPoints = (receipt) => {
  let points = 0;
  for (let item of receipt.items) {
    let { shortDescription, price } = item;
    if (shortDescription.trim().length % 3 == 0) {
      price *= 0.2;
      points += Math.ceil(price);
    }
  }
  return points;
};
// 6 points if the day in the purchase date is odd.
const getOddDayPoints = (receipt) => {
  let dayNum = Number(receipt.purchaseDate[8] + receipt.purchaseDate[9]);
  if (dayNum % 2 !== 0) return 6;
  return 0;
};
// 10 points if the time of purchase is after 2:00pm and before 4:00pm.
const getPurchaseTimePoints = (receipt) => {
  let hours = Number(receipt.purchaseTime.split(":")[0]);
  if (hours >= 14 && hours < 16) return 10;
  return 0;
};

let r1 = {
  retailer: "Target",
  purchaseDate: "2022-01-01",
  purchaseTime: "16:00",
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

module.exports = calcPoints

console.log(calcPoints(r1));
console.log(calcPoints(r2));
