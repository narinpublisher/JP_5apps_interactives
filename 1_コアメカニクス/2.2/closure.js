function makeCounter() {
  let count = 0; // この変数をクロージャが覚える

  return function() {
    count += 1;
    return count;
  };
}

const counter = makeCounter();

console.log(counter()); // → 1
console.log(counter()); // → 2
console.log(counter()); // → 3