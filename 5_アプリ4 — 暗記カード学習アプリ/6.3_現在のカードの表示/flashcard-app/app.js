// ==========================
// カードデータ
// ==========================

const cardData = [

  {
    id: 1,
    front: 'implement',
    back: '実装する・導入する',
    example:
      'We need to implement this feature by Friday.',
    category: '動詞',
  },

  {
    id: 2,
    front: 'refactor',
    back: 'リファクタリングする',
    example:
      "Let's refactor this code to make it cleaner.",
    category: '動詞',
  },

  {
    id: 3,
    front: 'deprecated',
    back: '非推奨の・廃止予定の',
    example:
      'This method is deprecated.',
    category: '形容詞',
  },

  {
    id: 4,
    front: 'optimize',
    back: '最適化する',
    example:
      'We should optimize the loading speed.',
    category: '動詞',
  },

  {
    id: 5,
    front: 'responsive',
    back: 'レスポンシブな',
    example:
      'This website is fully responsive.',
    category: '形容詞',
  },

  {
    id: 6,
    front: 'deploy',
    back: 'デプロイする',
    example:
      'We deployed the app yesterday.',
    category: '動詞',
  },

  {
    id: 7,
    front: 'maintain',
    back: '保守する・維持する',
    example:
      'It is difficult to maintain legacy systems.',
    category: '動詞',
  },

  {
    id: 8,
    front: 'scalable',
    back: '拡張可能な',
    example:
      'We need a scalable architecture.',
    category: '形容詞',
  },

  {
    id: 9,
    front: 'authenticate',
    back: '認証する',
    example:
      'Users must authenticate before login.',
    category: '動詞',
  },

  {
    id: 10,
    front: 'debug',
    back: 'バグを修正する',
    example:
      'I spent hours debugging the issue.',
    category: '動詞',
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

const cardInner =
  document.querySelector('#cardInner');

const cardFront =
  document.querySelector('#cardFront');

const cardBack =
  document.querySelector('#cardBack');

const cardExample =
  document.querySelector('#cardExample');

const cardCategory =
  document.querySelector('#cardCategory');

const cardCounter =
  document.querySelector('#cardCounter');

const correctCount =
  document.querySelector('#correctCount');

const incorrectCount =
  document.querySelector('#incorrectCount');

const flipBtn =
  document.querySelector('#flipBtn');

const prevBtn =
  document.querySelector('#prevBtn');

const nextBtn =
  document.querySelector('#nextBtn');


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
// 描画
// ==========================

function render() {

  const card =
    state.cards[state.currentIndex];

  // カウンター
  cardCounter.textContent =
    `カード: ${state.currentIndex + 1} / ${state.cards.length}`;

  // カード内容
  cardFront.textContent =
    card.front;

  cardBack.textContent =
    card.back;

  cardExample.textContent =
    card.example;

  cardCategory.textContent =
    card.category;

  // スコア
  correctCount.textContent =
    state.correctCount;

  incorrectCount.textContent =
    state.incorrectCount;

  // カード向き
  if (state.isFlipped) {

    cardInner.classList.add('flipped');

  } else {

    cardInner.classList.remove('flipped');

  }

  // ボタン状態
  prevBtn.disabled =
    state.currentIndex === 0;

  nextBtn.disabled =
    state.currentIndex ===
    state.cards.length - 1;
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
// カードをめくる
// ==========================

function flipCard() {

  state.isFlipped =
    !state.isFlipped;

  render();
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

  // スクリーンショット用
  // 3 / 10 を表示
  state.currentIndex = 2;

  state.isFlipped = false;

  state.correctCount = 0;

  state.incorrectCount = 0;

  render();
}

startQuiz();