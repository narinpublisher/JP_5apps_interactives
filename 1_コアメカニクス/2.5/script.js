// =========================
// 要素の選択
// =========================

const button = document.querySelector('#calcButton');

const priceInput =
  document.querySelector('#price');

const resultEl =
  document.querySelector('#result');


// =========================
// input イベント
// =========================

priceInput.addEventListener('input', (event) => {

  console.log(
    '現在の入力値：',
    event.target.value
  );

});


// =========================
// click イベント
// =========================

button.addEventListener('click', () => {

  console.log(
    '計算ボタンがクリックされました'
  );

  const price =
    Number(priceInput.value);

  const total =
    Math.round(price * 1.1);

  resultEl.textContent =
    `税込価格：${total}円`;

  resultEl.classList.add('highlight');

});