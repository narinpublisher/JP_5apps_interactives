// =========================
// API設定
// =========================

const API_KEY =
  '2e8ce7edd37d6723cbc2b408ca753def';

const BASE_URL =
  'https://api.openweathermap.org/data/2.5';


// =========================
// 要素取得
// =========================

const searchInput =
  document.querySelector('#searchInput');

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
// ローディング管理
// =========================

function setLoading(isLoading) {

  const spinner =
    document.querySelector('#spinner');

  const weatherCard =
    document.querySelector('#weatherCard');

  if (isLoading) {

    spinner.classList.remove('hidden');

    weatherCard.classList.add('hidden');

    searchBtn.disabled = true;

    searchBtn.textContent =
      '検索中...';

  } else {

    spinner.classList.add('hidden');

    searchBtn.disabled = false;

    searchBtn.textContent =
      '検索';

  }

}


// =========================
// エラー表示
// =========================

function showError(message) {

  document.querySelector(
    '#errorMsg'
  ).textContent = message;

}

function clearError() {

  document.querySelector(
    '#errorMsg'
  ).textContent = '';

}


// =========================
// 天気カード非表示
// =========================

function hideWeatherCard() {

  document
    .querySelector('#weatherCard')
    .classList.add('hidden');

}


// =========================
// 背景変更
// =========================

function setDynamicBackground(weatherId) {

  const body = document.body;

  if (
    weatherId >= 200 &&
    weatherId < 300
  ) {

    // 雷雨
    body.style.background =
      'linear-gradient(135deg, #1a1a2e, #16213e)';

  } else if (
    weatherId >= 300 &&
    weatherId < 600
  ) {

    // 雨
    body.style.background =
      'linear-gradient(135deg, #373b44, #4286f4)';

  } else if (
    weatherId >= 600 &&
    weatherId < 700
  ) {

    // 雪
    body.style.background =
      'linear-gradient(135deg, #e0eafc, #cfdef3)';

  } else if (
    weatherId === 800
  ) {

    // 快晴
    body.style.background =
      'linear-gradient(135deg, #2980b9, #6dd5fa, #ffffff)';

  } else if (
    weatherId > 800
  ) {

    // 曇り
    body.style.background =
      'linear-gradient(135deg, #757f9a, #d7dde8)';

  }

}


// =========================
// 天気表示
// =========================

function displayWeather(data) {

  document
    .querySelector('#weatherCard')
    .classList.remove('hidden');

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
    id,
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

  const iconUrl =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;


  // 背景変更
  setDynamicBackground(id);


  // DOM更新
  document.querySelector(
    '#cityName'
  ).textContent =
    `${name}, ${country}`;

  document.querySelector(
    '#temperature'
  ).textContent =
    `${Math.round(temp)}°C`;

  document.querySelector(
    '#description'
  ).textContent =
    description;

  document.querySelector(
    '#feelsLike'
  ).textContent =
    `体感 ${Math.round(feels_like)}°C`;

  document.querySelector(
    '#humidity'
  ).textContent =
    `湿度 ${humidity}%`;

  document.querySelector(
    '#windSpeed'
  ).textContent =
    `風速 ${speed}m/s`;

  document.querySelector(
    '#tempRange'
  ).textContent =
    `最高 ${Math.round(temp_max)}°C / 最低 ${Math.round(temp_min)}°C`;

  document.querySelector(
    '#weatherIcon'
  ).src =
    iconUrl;

}


// =========================
// 天気取得
// =========================

async function searchWeather() {

  const city =
    searchInput.value.trim();

  if (!city) {

    showError(
      '都市名を入力してください'
    );

    hideWeatherCard();

    return;

  }

  setLoading(true);

  clearError();

  addLog(
    '天気データ取得開始'
  );

  try {

    const url =
      `${BASE_URL}/weather`
      + `?q=${city}`
      + `&appid=${API_KEY}`
      + `&units=metric`
      + `&lang=ja`;

    const response =
      await fetch(url);


    // ステータスコード確認
    if (!response.ok) {

      if (
        response.status === 404
      ) {

        throw new Error(
          '都市が見つかりませんでした。英語または日本語のローマ字で入力してください'
        );

      } else if (
        response.status === 401
      ) {

        throw new Error(
          'APIキーが無効です'
        );

      } else {

        throw new Error(
          `サーバーエラー（${response.status}）`
        );

      }

    }

    const data =
      await response.json();

    console.log(data);

    displayWeather(data);

    addLog(
      '天気データ取得成功'
    );

  } catch (error) {

    hideWeatherCard();

    showError(
      error.message
    );

    addLog(
      `エラー: ${error.message}`
    );

  } finally {

    setLoading(false);

  }

}


// =========================
// イベント設定
// =========================

// ボタンクリック
searchBtn.addEventListener(
  'click',
  searchWeather
);


// Enterキー検索
searchInput.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Enter'
    ) {

      searchWeather();

    }

  }
);


// =========================
// 初期化
// =========================

window.addEventListener(
  'load',
  () => {

    addLog(
      'アプリが初期化されました'
    );

    searchInput.value =
      'Tokyo';

    searchWeather();

  }
);