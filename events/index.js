const { EventEmitter } = require("events");

const myEventEmitter = new EventEmitter();

//makeCoffee function and makeBill will be running when coffee-order event called
const makeCoffee = ({ name }) => {
  console.log(`Kopi ${name} telah dibuat`);
};

const makeBill = ({ price }) => {
  console.log(`Bill sebesar ${price} telah dibuat!`);
};

//add makeCoffee and makeBill function as listener on coffee-order event
myEventEmitter.on("coffee-order", makeCoffee);
myEventEmitter.on("coffee-order", makeBill);

//trigger coffee-order event
myEventEmitter.emit("coffee-order", { name: "Tubruk", price: 15000 });
