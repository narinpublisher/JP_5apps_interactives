// =========================
// map()
// =========================

const prices = [100, 200, 300, 400];

const withTax = prices.map(price =>
  Math.round(price * 1.1)
);

console.log(withTax);

console.log('map() 結果');
console.log(withTax);

document.getElementById('map-result').textContent =
`元データ:
${JSON.stringify(prices)}

税込価格:
${JSON.stringify(withTax)}
`;


// =========================
// filter()
// =========================

const expenses = [
  { category: '食費', amount: 1500 },
  { category: '交通費', amount: 800 },
  { category: '娯楽費', amount: 3000 },
  { category: '食費', amount: 2200 },
];

const foodExpenses =
  expenses.filter(e => e.category === '食費');

const bigExpenses =
  expenses.filter(e => e.amount >= 1000);

console.log('filter() 結果');
console.log(foodExpenses);
console.log(bigExpenses);

document.getElementById('filter-result').textContent =
`食費だけ:
${JSON.stringify(foodExpenses, null, 2)}

1000円以上:
${JSON.stringify(bigExpenses, null, 2)}
`;


// =========================
// reduce()
// =========================

const amounts = [1500, 800, 3000, 2200];

const total = amounts.reduce((acc, current) => {
  console.log(`${acc} + ${current} = ${acc + current}`);
  return acc + current;
}, 0);

console.log('reduce() 合計');
console.log(total);

document.getElementById('reduce-result').textContent =
`配列:
${JSON.stringify(amounts)}

累積計算:
0 + 1500 = 1500
1500 + 800 = 2300
2300 + 3000 = 5300
5300 + 2200 = 7500

最終合計:
${total}
`;


// =========================
// find()
// =========================

const tasks = [
  { id: 1, title: '企画書作成', done: false },
  { id: 2, title: 'ミーティング', done: true },
  { id: 3, title: 'コードレビュー', done: false },
];

const task = tasks.find(t => t.id === 2);

const missing = tasks.find(t => t.id === 99);

console.log('find() 結果');
console.log(task);
console.log(missing);

document.getElementById('find-result').textContent =
`id=2:
${JSON.stringify(task, null, 2)}

id=99:
${missing}
`;