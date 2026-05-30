if (true) {
  const message = 'ブロックの中です';
  console.log(message); // → ブロックの中です
}

// console.log(message); // ← ReferenceError: message is not defined
// ブロックの外では message は存在しない