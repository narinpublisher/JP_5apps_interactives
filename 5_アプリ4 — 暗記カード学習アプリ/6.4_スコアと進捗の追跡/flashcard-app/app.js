// ==========================
// カードデータ
// ==========================

const cardData = [

  {
    id: 1,
    front: 'implement',
    back: '実装する・導入する',
    example:
      'We need to implement this feature.',
    category: '動詞',
  },

  {
    id: 2,
    front: 'refactor',
    back: 'リファクタリングする',
    example:
      "Let's refactor this code.",
    category: '動詞',
  },

  {
    id: 3,
    front: 'deprecated',
    back: '非推奨の',
    example:
      'This API is deprecated.',
    category: '形容詞',
  },

  {
    id: 4,
    front: 'optimize',
    back: '最適化する',
    example:
      'We need to optimize the database.',
    category: '動詞',
  },

  {
    id: 5,
    front: 'scalable',
    back: '拡張可能な',
    example:
      'This system is highly scalable.',
    category: '形容詞',
  },

  {
    id: 6,
    front: 'debug',
    back: 'デバッグする',
    example:
      'I need to debug this issue.',
    category: '動詞',
  },

  {
    id: 7,
    front: 'deploy',
    back: 'デプロイする',
    example:
      'We will deploy the app tonight.',
    category: '動詞',
  },

  {
    id: 8,
    front: 'maintain',
    back: '保守する',
    example:
      'It is difficult to maintain legacy code.',
    category: '動詞',
  },

  {
    id: 9,
    front: 'framework',
    back: 'フレームワーク',
    example:
      'React is a popular framework.',
    category: '名詞',
  },

  {
    id: 10,
    front: 'responsive',
    back: 'レスポンシブな',
    example:
      'This design is fully responsive.',
    category: '形容詞',
  },

];


// ==========================
// 状態管理
// ==========================

const state = {

  cards: [],
  currentIndex: 0,
  isFlipped: false,
  correctCount: 0,
  incorrectCount: 0,

};


// ==========================
// 要素取得
// ==========================

const cardCounter =
  document.querySelector('#cardCounter');

const progressBar =
  document.querySelector('#progressBar');

const progressText =
  document.querySelector('#progressText');

const scoreCorrect =
  document.querySelector('#scoreCorrect');

const scoreIncorrect =
  document.querySelector('#scoreIncorrect');

const cardFront =
  document.querySelector('#cardFront');

const cardBack =
  document.querySelector('#cardBack');

const cardExample =
  document.querySelector('#cardExample');

const cardCategory =
  document.querySelector('#cardCategory');

const flashcard =
  document.querySelector('#flashcard');

const flipBtn =
  document.querySelector('#flipBtn');

const prevBtn =
  document.querySelector('#prevBtn');

const nextBtn =
  document.querySelector('#nextBtn');

const correctBtn =
  document.querySelector('#correctBtn');

const incorrectBtn =
  document.querySelector('#incorrectBtn');


// ==========================
// シャッフル
// ==========================

function shuffleArray(array) {

  const shuffled = [...array];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    const randomIndex =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      shuffled[i],
      shuffled[randomIndex]
    ] = [
      shuffled[randomIndex],
      shuffled[i]
    ];
  }

  return shuffled;
}


// ==========================
// プログレスバー更新
// ==========================

function updateProgressBar() {

  const total =
    state.cards.length;

  const done =
    state.correctCount +
    state.incorrectCount;

  const percent =
    Math.round(
      (done / total) * 100
    );

  // バー幅
  progressBar.style.width =
    `${percent}%`;

  // パーセント表示
  progressText.textContent =
    `${percent}%`;

  // 色変更
  if (percent < 40) {

    progressBar.style.backgroundColor =
      '#e74c3c';

  } else if (percent < 70) {

    progressBar.style.backgroundColor =
      '#f39c12';

  } else {

    progressBar.style.backgroundColor =
      '#27ae60';
  }

  // スコア表示
  scoreCorrect.textContent =
    state.correctCount;

  scoreIncorrect.textContent =
    state.incorrectCount;

  // カウンター
  cardCounter.textContent =
    `${done} / ${total}`;
}


// ==========================
// 描画
// ==========================

function render() {

  const card =
    state.cards[state.currentIndex];

  if (!card) return;

  // カード内容
  cardFront.textContent =
    card.front;

  cardBack.textContent =
    card.back;

  cardExample.textContent =
    card.example;

  cardCategory.textContent =
    card.category;

  // カードめくり
  if (state.isFlipped) {

    flashcard.classList.add('flipped');

  } else {

    flashcard.classList.remove('flipped');
  }

  // ボタン状態
  prevBtn.disabled =
    state.currentIndex === 0;

  nextBtn.disabled =
    state.currentIndex ===
    state.cards.length - 1;

  // プログレスバー更新
  updateProgressBar();
}


// ==========================
// カードめくり
// ==========================

function flipCard() {

  state.isFlipped =
    !state.isFlipped;

  render();
}


// ==========================
// 次へ
// ==========================

function goNext() {

  if (
    state.currentIndex <
    state.cards.length - 1
  ) {

    state.currentIndex++;

    state.isFlipped = false;

    render();
  }
}


// ==========================
// 前へ
// ==========================

function goPrev() {

  if (
    state.currentIndex > 0
  ) {

    state.currentIndex--;

    state.isFlipped = false;

    render();
  }
}


// ==========================
// 正解
// ==========================

function markCorrect() {

  state.correctCount++;

  state.currentIndex++;

  state.isFlipped = false;

  if (
    state.currentIndex >=
    state.cards.length
  ) {

    showResult();

  } else {

    render();
  }
}


// ==========================
// 不正解
// ==========================

function markIncorrect() {

  state.incorrectCount++;

  state.currentIndex++;

  state.isFlipped = false;

  if (
    state.currentIndex >=
    state.cards.length
  ) {

    showResult();

  } else {

    render();
  }
}


// ==========================
// 結果表示
// ==========================

function showResult() {

  const total =
    state.cards.length;

  const percent =
    Math.round(
      (state.correctCount / total) * 100
    );

  alert(
    `学習完了！\n\n` +
    `正解: ${state.correctCount}\n` +
    `不正解: ${state.incorrectCount}\n` +
    `正答率: ${percent}%`
  );
}


// ==========================
// イベント
// ==========================

flipBtn.addEventListener(
  'click',
  flipCard
);

nextBtn.addEventListener(
  'click',
  goNext
);

prevBtn.addEventListener(
  'click',
  goPrev
);

correctBtn.addEventListener(
  'click',
  markCorrect
);

incorrectBtn.addEventListener(
  'click',
  markIncorrect
);


// キーボード操作

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'ArrowRight'
    ) {

      goNext();
    }

    if (
      event.key === 'ArrowLeft'
    ) {

      goPrev();
    }

    if (
      event.key === ' '
    ) {

      event.preventDefault();

      flipCard();
    }
  }
);


// ==========================
// 初期化
// ==========================

function startQuiz() {

  state.cards =
    shuffleArray(cardData);

  state.currentIndex = 0;

  state.isFlipped = false;

  state.correctCount = 0;

  state.incorrectCount = 0;

  render();
}

startQuiz();