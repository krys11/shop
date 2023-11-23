const data = [
  {
    addItemToCart: [Function],
    item: {
      __v: 0,
      _id: [Object],
      brand: "PS3",
      category: [Object],
      countInStock: 25,
      description: "The most hard FIFA ever",
      image: "https://www.freepngimg.com/thumb/fifa/11-2-fifa-png-images.png",
      isFeatured: true,
      name: "FIFA",
      numReviews: 0,
      price: 250,
      rating: 1,
    },
  },
  {
    addItemToCart: [Function],
    item: {
      __v: 0,
      _id: [Object],
      brand: "IKEA",
      category: [Object],
      countInStock: 10,
      description: "beautiful chair for garden",
      image: "",
      isFeatured: true,
      name: "Garden Chair",
      numReviews: 0,
      price: 350.9,
      rating: 5,
    },
  },
];

console.log(data.forEach((i) => i.item.name));
