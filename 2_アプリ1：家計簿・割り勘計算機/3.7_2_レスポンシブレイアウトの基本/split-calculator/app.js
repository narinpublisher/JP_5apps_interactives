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
// 支出リスト関連
// =========================

const expenseName =
  document.querySelector('#expenseName');

const expenseAmount =
  document.querySelector('#expenseAmount');

const expenseCategory =
  document.querySelector('#expenseCategory');

const addBtn =
  document.querySelector('#addBtn');

const expenseList =
  document.querySelector('#expenseList');


// =========================
// 定数
// =========================

const TAX_RATE = 0.10;


// =========================
// 支出データ
// =========================

let expenses = [];


// =========================
// バリデーション関数
// =========================

function validate(total, people) {

  if (
    totalInput.value === '' ||
    peopleInput.value === ''
  ) {
    return '合計金額と人数を入力してください';
  }

  if (
    isNaN(total) ||
    isNaN(people)
  ) {
    return '数字を入力してください';
  }

  if (total < 0) {
    return '合計金額は0以上を入力してください';
  }

  if (people <= 0) {
    return '人数は1以上を入力してください';
  }

  return null;
}


// =========================
// 割り勘計算
// =========================

calcBtn.addEventListener('click', () => {

  const total =
    Number(totalInput.value);

  const people =
    Number(peopleInput.value);


  // バリデーション
  const errorText =
    validate(total, people);

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


  // エラー削除
  errorMsg.textContent = '';


  // 計算
  const perPerson =
    Math.round(total / people);

  const perPersonTax =
    Math.round(
      (total * (1 + TAX_RATE)) / people
    );


  // DOM更新
  resultAmount.textContent =
    perPerson.toLocaleString() + '円';

  resultTax.textContent =
    `税込 ${perPersonTax.toLocaleString()}円`;


  // activeクラス追加
  resultSection.classList.add('active');


  // Console確認
  console.log(
    '1人あたり（税抜）:',
    perPerson.toLocaleString() + '円'
  );

  console.log(
    '1人あたり（税込）:',
    perPersonTax.toLocaleString() + '円'
  );

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


// =========================
// 支出追加
// =========================

addBtn.addEventListener('click', () => {

  const name =
    expenseName.value.trim();

  const amount =
    Number(expenseAmount.value);

  const category =
    expenseCategory.value;


  // 入力チェック
  if (
    name === '' ||
    isNaN(amount) ||
    amount <= 0
  ) {

    alert(
      '項目名と金額を正しく入力してください'
    );

    return;
  }


  // 支出オブジェクト
  const expense = {

    id: Date.now(),

    name,
    amount,
    category,

  };


  // 配列に追加
  expenses.push(expense);


  // リスト描画
  renderList();


  // フォーム初期化
  expenseName.value = '';

  expenseAmount.value = '';

});


// =========================
// リスト描画
// =========================

function renderList() {

  expenseList.innerHTML = '';


  expenses.forEach((expense) => {

    const li =
      document.createElement('li');

    li.className =
      'expense-item';

    li.dataset.id =
      expense.id;


    li.innerHTML = `
      <span class="category-badge">
        ${expense.category}
      </span>

      <span class="expense-name">
        ${expense.name}
      </span>

      <span class="expense-amount">
        ${expense.amount.toLocaleString()}円
      </span>

      <button
        class="delete-btn"
        data-id="${expense.id}"
      >
        削除
      </button>
    `;


    expenseList.appendChild(li);

  });


  updateTotal();

}


// =========================
// 削除機能
// =========================

expenseList.addEventListener(
  'click',
  (event) => {

    if (
      !event.target.classList.contains(
        'delete-btn'
      )
    ) {
      return;
    }

    const id =
      Number(event.target.dataset.id);

    expenses =
      expenses.filter(
        e => e.id !== id
      );

    renderList();

  }
);


// =========================
// 合計更新
// =========================

function updateTotal() {

  const total =
    expenses.reduce(
      (acc, e) => acc + e.amount,
      0
    );


  // 合計入力欄へ反映
  totalInput.value = total;


  const people =
    Number(peopleInput.value);


  // 人数があれば自動再計算
  if (people > 0) {

    const perPerson =
      Math.round(total / people);

    const perPersonTax =
      Math.round(
        (total * (1 + TAX_RATE)) / people
      );


    resultAmount.textContent =
      perPerson.toLocaleString() + '円';

    resultTax.textContent =
      `税込 ${perPersonTax.toLocaleString()}円`;

    resultSection.classList.add('active');

  }

}