// =========================
// 要素取得
// =========================

const cityInput =
  document.querySelector('#cityInput');

const searchBtn =
  document.querySelector('#searchBtn');

const cityName =
  document.querySelector('#cityName');

const weatherText =
  document.querySelector('#weatherText');

const temperature =
  document.querySelector('#temperature');

const logList =
  document.querySelector('#logList');


// =========================
// OpenWeatherMap API設定
// =========================

// 自分のAPIキーに変更してください
const API_KEY =
  '2e8ce7edd37d6723cbc2b408ca753def';


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
// 天気表示
// =========================

function displayWeather(data) {

  // =========================
  // 데이터 분해
  // =========================

  const {
    name,
    sys,
    weather,
    main,
    wind
  } = data;

  const {
    country
  } = sys;

  const {
    description,
    icon
  } = weather[0];

  const {
    temp,
    feels_like,
    humidity,
    temp_max,
    temp_min
  } = main;

  const {
    speed
  } = wind;


  // =========================
  // 아이콘 URL 생성
  // =========================

  const iconUrl =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;


  // =========================
  // 화면 출력
  // =========================

  document.querySelector('#cityName')
    .textContent =
    `${name}, ${country}`;

  document.querySelector('#temperature')
    .textContent =
    `${Math.round(temp)}°C`;

  document.querySelector('#description')
    .textContent =
    description;

  document.querySelector('#feelsLike')
    .textContent =
    `体感 ${Math.round(feels_like)}°C`;

  document.querySelector('#humidity')
    .textContent =
    `湿度 ${humidity}%`;

  document.querySelector('#windSpeed')
    .textContent =
    `風速 ${speed}m/s`;

  document.querySelector('#tempRange')
    .textContent =
    `最高 ${Math.round(temp_max)}°C / 最低 ${Math.round(temp_min)}°C`;

  document.querySelector('#weatherIcon')
    .src =
    iconUrl;

}

// =========================
// エラー表示
// =========================

function showError(message) {

  cityName.textContent =
    'エラー';

  weatherText.textContent =
    message;

  temperature.textContent =
    '--°C';

}


// =========================
// 天気データ取得
// async / await版
// =========================

async function fetchWeather(city) {

  try {

    addLog(
      '天気データ取得開始'
    );


    // =========================
    // API URL生成
    // =========================

    const url =
      `https://api.openweathermap.org/data/2.5/weather`
      + `?q=${city}`
      + `&appid=${API_KEY}`
      + `&units=metric`
      + `&lang=ja`;


    // =========================
    // fetch実行
    // =========================

    const response =
      await fetch(url);


    // =========================
    // ステータス確認
    // =========================

    console.log(
      'Status:',
      response.status
    );

    console.log(
      'OK:',
      response.ok
    );


    if (!response.ok) {

      throw new Error(
        `HTTPエラー: ${response.status}`
      );

    }


    // =========================
    // JSON変換
    // =========================

    const data =
      await response.json();


    // =========================
    // Console確認
    // =========================

    console.log(
      '取得データ:',
      data
    );


    // =========================
    // 画面表示
    // =========================

    displayWeather(data);

    addLog(
      '天気データ取得成功'
    );

  } catch (error) {

    console.error(error);

    showError(
      '都市が見つかりません'
    );

    addLog(
      'エラーが発生しました'
    );

  }

}


// =========================
// 検索ボタン
// =========================

searchBtn.addEventListener(
  'click',
  () => {

    const city =
      cityInput.value.trim();


    // =========================
    // 入力チェック
    // =========================

    if (city === '') {

      alert(
        '都市名を入力してください'
      );

      return;

    }


    // =========================
    // API実行
    // =========================

    fetchWeather(city);

  }
);


// =========================
// Enterキー対応
// =========================

cityInput.addEventListener(
  'keydown',
  (event) => {

    if (event.key === 'Enter') {

      searchBtn.click();

    }

  }
);


// =========================
// 初期表示
// =========================

addLog(
  'アプリが初期化されました'
);