function generateFactorial(num) {
  let result = num;
  if (num > 0 && num !== 1) {
    for (let i = num - 1; i >= 1; i -= 1) {
      result *= i;
    }
  }
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }

  return result;
}

const main = () => {
  let finalResult = 500000;
  const factorials = [];

  for (let i = 0; i < 10; i += 1) {
    const f = generateFactorial(i);
    factorials.push(f);
  }
  for (let i = 0; i < factorials.length; i += 1) {
    finalResult -= factorials[i];
  }
  return finalResult;
};

console.log(main());
