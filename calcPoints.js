const calcPoints = (receipt) => {
  let namePoints = getNamePoints(receipt);

  return namePoints;
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
