// ==========================
// カードデータ
// ==========================

const cardData = [
  {
    id: 1,
    front: 'implement',
    back: '実装する・導入する',
    example: 'We need to implement this feature.',
    category: '動詞',
  },
  {
    id: 2,
    front: 'refactor',
    back: 'リファクタリングする',
    example: "Let's refactor this code.",
    category: '動詞',
  },
  {
    id: 3,
    front: 'deprecated',
    back: '非推奨の',
    example: 'This API is deprecated.',
    category: '形容詞',
  },
  {
    id: 4,
    front: 'optimize',
    back: '最適化する',
    example: 'We need to optimize performance.',
    category: '動詞',
  },
  {
    id: 5,
    front: 'database',
    back: 'データベース',
    example: 'The app stores data in a database.',
    category: '名詞',
  },
  {
    id: 6,
    front: 'framework',
    back: 'フレームワーク',
    example: 'React is a JavaScript framework.',
    category: '名詞',
  },
  {
    id: 7,
    front: 'responsive',
    back: 'レスポンシブ対応',
    example: 'Responsive design is important.',
    category: '形容詞',
  },
  {
    id: 8,
    front: 'variable',
    back: '変数',
    example: 'Use variables to store values.',
    category: '名詞',
  },
  {
    id: 9,
    front: 'function',
    back: '関数',
    example: 'Functions execute reusable logic.',
    category: '名詞',
  },
  {
    id: 10,
    front: 'debug',
    back: 'デバッグする',
    example: 'Debugging helps find bugs.',
    category: '動詞',
  },
];

// ==========================
// 状態
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

const flashcard = document.querySelector('#flashcard');

const cardFront = document.querySelector('#cardFront');
const cardBack = document.querySelector('#cardBack');
const cardExample = document.querySelector('#cardExample');
const cardCategory = document.querySelector('#cardCategory');

const cardCounter = document.querySelector('#cardCounter');

const progressBar = document.querySelector('#progressBar');
const progressText = document.querySelector('#progressText');

const scoreCorrect = document.querySelector('#scoreCorrect');
const scoreIncorrect = document.querySelector('#scoreIncorrect');

const answerButtons =
  document.querySelector('#answerButtons');

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const flipBtn = document.querySelector('#flipBtn');

const correctBtn =
  document.querySelector('#correctBtn');

const incorrectBtn =
  document.querySelector('#incorrectBtn');

const restartBtn =
  document.querySelector('#restartBtn');

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
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[i],
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

  cardFront.textContent = card.front;
  cardBack.textContent = card.back;
  cardExample.textContent =
    card.example;
  cardCategory.textContent =
    card.category;

  cardCounter.textContent =
    `${state.currentIndex + 1} / ${state.cards.length}`;

  scoreCorrect.textContent =
    state.correctCount;

  scoreIncorrect.textContent =
    state.incorrectCount;

  updateProgressBar();

  flashcard.classList.toggle(
    'flipped',
    state.isFlipped
  );

  answerButtons.classList.toggle(
    'hidden',
    !state.isFlipped
  );

  prevBtn.disabled =
    state.currentIndex === 0;

  nextBtn.disabled =
    state.currentIndex ===
    state.cards.length - 1;
}

// ==========================
// プログレスバー
// ==========================

function updateProgressBar() {
  const done =
    state.correctCount +
    state.incorrectCount;

  const total =
    state.cards.length;

  const percent =
    Math.round(
      (done / total) * 100
    );

  progressBar.style.width =
    `${percent}%`;

  progressText.textContent =
    `${percent}%`;

  if (percent < 40) {
    progressBar.style.background =
      '#e74c3c';
  } else if (percent < 70) {
    progressBar.style.background =
      '#f39c12';
  } else {
    progressBar.style.background =
      '#27ae60';
  }
}

// ==========================
// めくる
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
  } else {
    showResult();
  }
}

// ==========================
// 前へ
// ==========================

function goPrev() {
  if (state.currentIndex > 0) {
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
  goNext();
}

// ==========================
// 不正解
// ==========================

function markIncorrect() {
  state.incorrectCount++;
  goNext();
}

// ==========================
// 結果画面
// ==========================

function showResult() {
  const total =
    state.cards.length;

  const correct =
    state.correctCount;

  const incorrect =
    state.incorrectCount;

  const percentage =
    Math.round(
      (correct / total) * 100
    );

  let message = '';

  if (percentage === 100) {
    message =
      '🎉 パーフェクト！全問正解です！';
  } else if (percentage >= 80) {
    message =
      '👏 素晴らしい！あと少しで完璧です！';
  } else if (percentage >= 50) {
    message =
      '💪 半分以上正解！もう一度挑戦してみましょう。';
  } else {
    message =
      '📚 まだ伸びしろがたくさんあります。復習しましょう！';
  }

  document.querySelector(
    '#resultMessage'
  ).textContent = message;

  document.querySelector(
    '#resultPercent'
  ).textContent =
    `正解率: ${percentage}%`;

  document.querySelector(
    '#resultCorrect'
  ).textContent =
    `正解: ${correct}問`;

  document.querySelector(
    '#resultIncorrect'
  ).textContent =
    `不正解: ${incorrect}問`;

  scoreCorrect.textContent =
    correct;

  scoreIncorrect.textContent =
    incorrect;

  cardCounter.textContent =
    `${total} / ${total}`;

  progressBar.style.width =
    '100%';

  progressText.textContent =
    '100%';

  progressBar.style.background =
    '#27ae60';


  document
    .querySelector('#quizArea')
    .classList.add('hidden');

  document
    .querySelector('#resultArea')
    .classList.remove('hidden');
}

// ==========================
// リスタート
// ==========================

function restartQuiz() {
  state.currentIndex = 0;
  state.correctCount = 0;
  state.incorrectCount = 0;
  state.isFlipped = false;

  state.cards =
    shuffleArray(cardData);

  document
    .querySelector('#resultArea')
    .classList.add('hidden');

  document
    .querySelector('#quizArea')
    .classList.remove('hidden');

  render();
}

// ==========================
// イベント
// ==========================

flashcard.addEventListener(
  'click',
  flipCard
);

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

restartBtn.addEventListener(
  'click',
  restartQuiz
);

// キーボード操作

document.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'ArrowRight') {
      goNext();
    }

    if (event.key === 'ArrowLeft') {
      goPrev();
    }

    if (event.key === ' ') {
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

window.addEventListener(
  'load',
  () => {
    startQuiz();
  }
);