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

const totalAmount =
  document.querySelector('#totalAmount');


// =========================
// データ管理
// =========================

let expenses = [];


// =========================
// 追加ボタン
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


  console.log(name);
  console.log(amount);
  console.log(category);
  console.log(date);

});