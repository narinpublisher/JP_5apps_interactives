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

const resultSection =
  document.querySelector('#resultSection');


// =========================
// 定数
// =========================

const TAX_RATE = 0.10;


// =========================
// バリデーション関数
// =========================

/**
 * 入力値チェック
 * @param {number} total
 * @param {number} people
 * @returns {string|null}
 */

function validate(total, people) {

  // 空欄チェック
  if (
    totalInput.value === '' ||
    peopleInput.value === ''
  ) {

    return '合計金額と人数を入力してください';

  }

  // 数値チェック
  if (
    isNaN(total) ||
    isNaN(people)
  ) {

    return '数字を入力してください';

  }

  // マイナスチェック
  if (total < 0) {

    return '合計金額は0以上を入力してください';

  }

  // 0人チェック
  if (people <= 0) {

    return '人数は1以上を入力してください';

  }

  // エラーなし
  return null;

}


// =========================
// 割り勘計算
// =========================

calcBtn.addEventListener('click', () => {

  // 入力値取得
  const total =
    Number(totalInput.value);

  const people =
    Number(peopleInput.value);


  // =========================
  // Console確認
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
  // バリデーション実行
  // =========================

  const errorText =
    validate(total, people);

  // エラーがある場合
  if (errorText !== null) {

    errorMsg.textContent =
      errorText;

    resultAmount.textContent =
      '——';

    resultTax.textContent =
      '';

    resultSection.classList.remove('active');

    return;

  }


  // =========================
  // エラー削除
  // =========================

  errorMsg.textContent = '';


  // =========================
  // 計算
  // =========================

  const perPerson =
    Math.round(total / people);

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
  // DOM更新
  // =========================

  resultAmount.textContent =
    perPerson.toLocaleString() + '円';

  resultTax.textContent =
    `税込 ${perPersonTax.toLocaleString()}円`;


  // =========================
  // activeクラス追加
  // =========================

  resultSection.classList.add('active');

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