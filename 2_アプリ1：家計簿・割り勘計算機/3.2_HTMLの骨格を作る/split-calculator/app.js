// =========================
// 要素取得
// =========================

const totalInput =
  document.querySelector('#total');

const peopleInput =
  document.querySelector('#people');

const calcBtn =
  document.querySelector('#calcBtn');

const resultAmount =
  document.querySelector('#resultAmount');

const resultTax =
  document.querySelector('#resultTax');

const errorMsg =
  document.querySelector('#errorMsg');


// =========================
// 割り勘計算
// =========================

calcBtn.addEventListener('click', () => {

  const total =
    Number(totalInput.value);

  const people =
    Number(peopleInput.value);


  // バリデーション
  if (!total || !people) {

    errorMsg.textContent =
      '金額と人数を入力してください';

    return;
  }

  errorMsg.textContent = '';


  // 税込み計算
  const taxedTotal =
    total * 1.1;

  // 1人あたり
  const perPerson =
    taxedTotal / people;


  // 画面更新
  resultAmount.textContent =
    `¥${Math.round(perPerson).toLocaleString()}`;

  resultTax.textContent =
    `税込合計：¥${Math.round(taxedTotal).toLocaleString()}`;

});