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

  // 文字列 → 数値変換
  const total =
    Number(totalInput.value);

  const people =
    Number(peopleInput.value);


  // =========================
  // Console確認用
  // =========================

  console.log(
    '合計金額（数値）:',
    total
  );

  console.log(
    '人数（数値）:',
    people
  );

  console.log(
    '型:',
    typeof total
  );


  // =========================
  // バリデーション
  // =========================

  if (!total || !people) {

    errorMsg.textContent =
      '金額と人数を入力してください';

    resultAmount.textContent =
      '——';

    resultTax.textContent =
      '';

    return;
  }

  errorMsg.textContent = '';


  // =========================
  // 税込み計算
  // =========================

  const taxedTotal =
    total * 1.1;

  const perPerson =
    taxedTotal / people;


  // =========================
  // UI更新
  // =========================

  resultAmount.textContent =
    `¥${Math.round(perPerson).toLocaleString()}`;

  resultTax.textContent =
    `税込合計：¥${Math.round(taxedTotal).toLocaleString()}`;

});


// =========================
// inputイベント
// =========================

totalInput.addEventListener('input', (event) => {

  console.log(
    '現在の入力値:',
    event.target.value
  );

});