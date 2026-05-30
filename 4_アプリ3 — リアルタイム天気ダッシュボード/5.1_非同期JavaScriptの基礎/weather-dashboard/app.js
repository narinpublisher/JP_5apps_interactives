// =========================
// 要素取得
// =========================

const cityInput =
  document.querySelector('#cityInput');

const searchBtn =
  document.querySelector('#searchBtn');

const logList =
  document.querySelector('#logList');


// =========================
// ログ追加
// =========================

function addLog(message) {

  const li =
    document.createElement('li');

  li.textContent = message;

  logList.appendChild(li);

}


// =========================
// 同期処理の例
// =========================

function syncExample() {

  addLog('同期処理 開始');

  console.log('1');

  console.log('2');

  console.log('3');

  addLog('同期処理 終了');

}


// =========================
// 非同期処理の例
// =========================

function asyncExample() {

  addLog('非同期処理 開始');


  setTimeout(() => {

    addLog(
      '2秒後に実行されました'
    );

    console.log(
      '非同期コールバック実行'
    );

  }, 2000);


  addLog(
    'setTimeout登録完了'
  );

}


// =========================
// ボタンイベント
// =========================

searchBtn.addEventListener(
  'click',
  () => {

    addLog(
      '検索ボタンがクリックされました'
    );

    syncExample();

    asyncExample();

  }
);


// =========================
// 初期ログ
// =========================

addLog(
  'アプリが初期化されました'
);
