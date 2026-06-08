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
// 定数
// =========================

const TAX_RATE = 0.10;


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
  // 四則演算と丸め処理
  // =========================

  // 税抜
  const perPerson =
    Math.round(total / people);

  // 税込
  const perPersonTax =
    Math.round(
      (total * (1 + TAX_RATE)) / people
    );


  // =========================
  // Console表示
  // =========================

  console.log(
    '1人あたり（税抜）:',
    perPerson.toLocaleString() + '円'
  );

  console.log(
    '1人あたり（税込）:',
    perPersonTax.toLocaleString() + '円'
  );


  // =========================
  // UI更新
  // =========================

  resultAmount.textContent =
    `¥${perPersonTax.toLocaleString()}`;

  resultTax.textContent =
    `税抜：¥${perPerson.toLocaleString()}`;

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