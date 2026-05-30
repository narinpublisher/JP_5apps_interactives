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
    cityInput.value.trim();

  if (!city) {

    showError(
      '都市名を入力してください'
    );

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

    if (!response.ok) {

      if (response.status === 404) {

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

    showError(error.message);

    addLog(
      `エラー: ${error.message}`
    );

  } finally {

    setLoading(false);

  }

}


// =========================
// ボタンイベント
// =========================

searchBtn.addEventListener(
  'click',
  searchWeather
);


// =========================
// 初期化
// =========================

addLog(
  'アプリが初期化されました'
);