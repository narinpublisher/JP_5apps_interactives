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

const filterBar =
  document.querySelector('.filter-bar');

const listCount =
  document.querySelector('#listCount');


// =========================
// 状態管理
// =========================

let expenses = [];

let currentFilter = 'all';


// =========================
// カテゴリカラー
// =========================

const CATEGORY_COLORS = {
  '食費':   '#3498db',
  '交通費': '#2ecc71',
  '娯楽費': '#e67e22',
  'その他': '#95a5a6',
};


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


  // =========================
  // 入力チェック
  // =========================

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


  // =========================
  // 支出オブジェクト生成
  // =========================

  const newExpense = {
    id: Date.now(),
    name,
    amount,
    category,
    date,
  };


  // =========================
  // 配列へ追加
  // =========================

  expenses.push(newExpense);


  // =========================
  // Console確認
  // =========================

  console.log(
    '追加された支出:',
    newExpense
  );

  console.log(expenses);


  // =========================
  // 再描画
  // =========================

  render();


  // =========================
  // 入力欄リセット
  // =========================

  expenseName.value = '';

  expenseAmount.value = '';

  expenseDate.value = '';

});


// =========================
// フィルター切り替え
// =========================

filterBar.addEventListener('click', (event) => {

  const btn =
    event.target.closest('.filter-btn');

  if (!btn) return;


  // =========================
  // フィルター状態更新
  // =========================

  currentFilter =
    btn.dataset.category;


  // =========================
  // active切り替え
  // =========================

  document
    .querySelectorAll('.filter-btn')
    .forEach(button => {

      button.classList.remove('active');

    });

  btn.classList.add('active');


  // =========================
  // 再描画
  // =========================

  render();

});


// =========================
// フィルター済み配列取得
// =========================

function getFilteredExpenses() {

  if (
    currentFilter === 'all' ||
    currentFilter === 'すべて'
  ) {

    return expenses;

  }

  return expenses.filter(expense => {

    return expense.category === currentFilter;

  });

}


// =========================
// 支出削除
// =========================

function deleteExpense(id) {

  expenses = expenses.filter(expense => {

    return expense.id !== id;

  });

  render();

}


// =========================
// 日付整形
// =========================

function formatDate(dateStr) {

  const d =
    new Date(dateStr + 'T00:00:00');

  const month =
    d.getMonth() + 1;

  const day =
    d.getDate();

  return `${month}月${day}日`;

}


// =========================
// 合計計算
// =========================

function calcTotal(list) {

  return list.reduce((acc, expense) => {

    return acc + expense.amount;

  }, 0);

}


// =========================
// カテゴリ別集計
// =========================

function calcByCategory(list) {

  const result = {};

  list.forEach(expense => {

    if (!result[expense.category]) {

      result[expense.category] = 0;

    }

    result[expense.category] += expense.amount;

  });

  return result;

}


// =========================
// リスト描画
// =========================

function renderList() {

  const filtered =
    getFilteredExpenses();


  // =========================
  // 件数表示
  // =========================

  if (listCount) {

    listCount.textContent =
      `（${filtered.length}件）`;

  }


  // =========================
  // リスト初期化
  // =========================

  expenseList.innerHTML = '';


  // =========================
  // データなし
  // =========================

  if (filtered.length === 0) {

    expenseList.innerHTML =
      `
      <li class="empty-msg">
        支出がありません
      </li>
      `;

    return;
  }


  // =========================
  // 新しい順に並び替え
  // =========================

  const sorted =
    [...filtered].sort((a, b) => {

      return b.id - a.id;

    });


  // =========================
  // 描画
  // =========================

  sorted.forEach(expense => {

    const li =
      document.createElement('li');

    li.className = 'expense-item';


    li.innerHTML = `
      <div class="expense-left">

        <span
          class="cat-badge cat-${expense.category}"
        >
          ${expense.category}
        </span>

        <div class="expense-info">

          <span class="expense-name">
            ${expense.name}
          </span>

          <span class="expense-date">
            ${formatDate(expense.date)}
          </span>

        </div>

      </div>

      <div class="expense-right">

        <span class="expense-amount">
          ${expense.amount.toLocaleString()}円
        </span>

        <button
          class="del-btn"
          data-id="${expense.id}"
        >
          削除
        </button>

      </div>
    `;

    expenseList.appendChild(li);

  });

}


// =========================
// 削除イベント委任
// =========================

expenseList.addEventListener('click', (event) => {

  const btn =
    event.target.closest('.del-btn');

  if (!btn) return;


  const id =
    Number(btn.dataset.id);

  deleteExpense(id);

});


// =========================
// 月間合計更新
// =========================

function updateMonthlyTotal() {

  const total =
    calcTotal(expenses);

  monthlyTotal.textContent =
    `${total.toLocaleString()}円`;

}


// =========================
// カテゴリバー描画
// =========================

function renderBars() {

  const total =
    calcTotal(expenses);

  const byCategory =
    calcByCategory(expenses);


  // =========================
  // 初期化
  // =========================

  categoryBars.innerHTML = '';


  // =========================
  // データなし
  // =========================

  if (total === 0) {

    categoryBars.innerHTML =
      `
      <p class="no-data">
        データがありません
      </p>
      `;

    return;
  }


  // =========================
  // 表示順
  // =========================

  const categories = [
    '食費',
    '交通費',
    '娯楽費',
    'その他'
  ];


  // =========================
  // バー生成
  // =========================

  categories.forEach(category => {

    const amount =
      byCategory[category] || 0;

    if (amount === 0) return;


    const percent =
      Math.round(
        (amount / total) * 100
      );

    const color =
      CATEGORY_COLORS[category];


    const div =
      document.createElement('div');

    div.className = 'bar-row';


    div.innerHTML = `
      <div class="bar-label">

        <span>
          ${category}
        </span>

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
// 全体再描画
// =========================

function render() {

  renderList();

  updateMonthlyTotal();

  renderBars();

}


// =========================
// 初期描画
// =========================

render();