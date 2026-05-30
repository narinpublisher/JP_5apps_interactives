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

const temp =
  document.querySelector('#temp');


// =========================
// 天気取得
// =========================

async function getWeatherData() {

  try {

    // =========================
    // API URL
    // =========================

    const url =
      'https://api.open-meteo.com/v1/forecast'
      + '?latitude=35.68'
      + '&longitude=139.69'
      + '&current_weather=true';


    // =========================
    // fetch
    // =========================

    const response =
      await fetch(url);


    // =========================
    // status確認
    // =========================

    console.log(
      'status:',
      response.status
    );

    console.log(
      'ok:',
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


    console.log(data);


    // =========================
    // 画面表示
    // =========================

    cityName.textContent =
      cityInput.value || 'Tokyo';

    weatherText.textContent =
      '晴れ';

    temp.textContent =
      `${data.current_weather.temperature}°C`;

  } catch (error) {

    console.error(
      'エラー:',
      error
    );

  }

}


// =========================
// ボタンイベント
// =========================

searchBtn.addEventListener(
  'click',
  getWeatherData
);


// =========================
// 初期実行
// =========================

getWeatherData();
