// =========================
// Promiseチェーンの例
// =========================

fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current_weather=true'
)

  .then(response => {

    console.log(
      'ステップ1: レスポンスを受け取った'
    );

    return response.json();

  })

  .then(data => {

    console.log(
      'ステップ2: JSONに変換できた'
    );

    console.log(
      '気温:',
      data.current_weather.temperature,
      '°C'
    );

  })

  .catch(error => {

    console.error(
      'エラー:',
      error
    );

  });
