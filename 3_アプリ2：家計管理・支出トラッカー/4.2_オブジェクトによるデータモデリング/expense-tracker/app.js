// =========================
// 要素取得
// =========================

const expenseName =
  document.querySelector('#expenseName');

const expenseAmount =
  document.querySelector('#expenseAmount');

const expenseCategory =
  document.querySelector('#expenseCategory');

const expenseDate =
  document.querySelector('#expenseDate');

const addBtn =
  document.querySelector('#addBtn');

const expenseList =
  document.querySelector('#expenseList');

const monthlyTotal =
  document.querySelector('#monthlyTotal');

const categoryBars =
  document.querySelector('#categoryBars');

const filterButtons =
  document.querySelectorAll('.filter-btn');


// =========================
// カテゴリ色
// =========================

const CATEGORY_COLORS = {
  '食費': '#3498db',
  '交通費': '#2ecc71',
  '娯楽費': '#e67e22',
  'その他': '#95a5a6',
};


// =========================
// データ管理
// =========================

let expenses = [];

let currentFilter = 'すべて';


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

  const date =
    expenseDate.value;


  // 入力チェック
  if (
    name === '' ||
    isNaN(amount) ||
    amount <= 0 ||
    date === ''
  ) {

    alert(
      '項目名・金額・日付を正しく入力してください'
    );

    return;
  }


  // 支出オブジェクト
  const expense = {
    id: Date.now(),
    name,
    amount,
    category,
    date,
  };


  // 配列追加
  expenses.unshift(expense);


  console.log('追加された支出:', expense);


  // 再描画
  renderList();
  renderBars();


  // 入力リセット
  expenseName.value = '';
  expenseAmount.value = '';
  expenseDate.value = '';

});


// =========================
// リスト描画
// =========================

function renderList() {

  expenseList.innerHTML = '';


  // フィルター
  const filteredExpenses =
    currentFilter === 'すべて'
      ? expenses
      : expenses.filter(
          expense =>
            expense.category === currentFilter
        );


  // データなし
  if (filteredExpenses.length === 0) {

    expenseList.innerHTML = `
      <p class="no-data">
        データがありません
      </p>
    `;

    return;
  }


  // リスト生成
  filteredExpenses.forEach((expense) => {

    const li =
      document.createElement('li');

    li.className = 'expense-item';

    li.innerHTML = `
      <span class="cat-badge cat-${expense.category}">
        ${expense.category}
      </span>

      <div class="expense-name">
        ${expense.name}
        <div class="expense-date">
          ${expense.date}
        </div>
      </div>

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

expenseList.addEventListener('click', (event) => {

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
      expense => expense.id !== id
    );

  renderList();
  renderBars();

});


// =========================
// 合計計算
// =========================

function calcTotal(data) {

  return data.reduce(
    (acc, expense) =>
      acc + expense.amount,
    0
  );

}


// =========================
// カテゴリ別集計
// =========================

function calcByCategory(data) {

  const result = {};

  data.forEach((expense) => {

    if (!result[expense.category]) {
      result[expense.category] = 0;
    }

    result[expense.category] +=
      expense.amount;

  });

  return result;

}


// =========================
// 月間合計更新
// =========================

function updateTotal() {

  const total =
    calcTotal(expenses);

  monthlyTotal.textContent =
    `${total.toLocaleString()}円`;

}


// =========================
// バー描画
// =========================

function renderBars() {

  const total =
    calcTotal(expenses);

  const byCategory =
    calcByCategory(expenses);

  categoryBars.innerHTML = '';


  // データなし
  if (total === 0) {

    categoryBars.innerHTML = `
      <p class="no-data">
        データがありません
      </p>
    `;

    return;
  }


  const categories = [
    '食費',
    '交通費',
    '娯楽費',
    'その他'
  ];


  categories.forEach((cat) => {

    const amount =
      byCategory[cat] || 0;

    if (amount === 0) return;

    const percent =
      Math.round(
        (amount / total) * 100
      );

    const color =
      CATEGORY_COLORS[cat];


    const div =
      document.createElement('div');

    div.className = 'bar-row';

    div.innerHTML = `
      <div class="bar-label">

        <span>${cat}</span>

        <span>
          ${amount.toLocaleString()}円
          （${percent}%）
        </span>

      </div>

      <div class="bar-track">

        <div
          class="bar-fill"
          style="
            width: ${percent}%;
            background: ${color};
          "
        ></div>

      </div>
    `;

    categoryBars.appendChild(div);

  });

}


// =========================
// フィルター
// =========================

filterButtons.forEach((button) => {

  button.addEventListener('click', () => {

    currentFilter =
      button.dataset.category;


    // active切り替え
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');


    renderList();

  });

});


// =========================
// 初期描画
// =========================

renderList();
renderBars();