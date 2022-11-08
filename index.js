const evenOddNumber = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] % 2 == 0) {
      console.log(`${arr[i]} is even number`);
    } else {
      console.log(`${arr[i]} is odd number`);
    }
  }
};
const number = [1, 2, 4, 7, 9];
evenOddNumber(number);

