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

const cardNum =
  document.querySelector('#cardNum');

const totalCards =
  document.querySelector('#totalCards');

const correctCount =
  document.querySelector('#correctCount');

const incorrectCount =
  document.querySelector('#incorrectCount');

const flipBtn =
  document.querySelector('#flipBtn');

const nextBtn =
  document.querySelector('#nextBtn');

const correctBtn =
  document.querySelector('#correctBtn');

const incorrectBtn =
  document.querySelector('#incorrectBtn');


// ==========================
// Fisher-Yatesシャッフル
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

  const currentCard =
    state.cards[state.currentIndex];

  cardFront.textContent =
    currentCard.front;

  cardBack.innerHTML = `
    <div>${currentCard.back}</div>

    <div class="example">
      ${currentCard.example}
    </div>

    <div class="category">
      ${currentCard.category}
    </div>
  `;

  cardNum.textContent =
    state.currentIndex + 1;

  totalCards.textContent =
    state.cards.length;

  correctCount.textContent =
    state.correctCount;

  incorrectCount.textContent =
    state.incorrectCount;

  if (state.isFlipped) {

    cardInner.classList.add('flipped');

  } else {

    cardInner.classList.remove('flipped');

  }
}


// ==========================
// クイズ開始
// ==========================

function startQuiz() {

  state.cards =
    shuffleArray(cardData);

  state.currentIndex = 0;

  state.correctCount = 0;

  state.incorrectCount = 0;

  state.isFlipped = false;

  render();
}


// ==========================
// カードをめくる
// ==========================

flipBtn.addEventListener(
  'click',
  () => {

    state.isFlipped =
      !state.isFlipped;

    render();
  }
);


// ==========================
// 正解
// ==========================

correctBtn.addEventListener(
  'click',
  () => {

    state.correctCount++;

    render();
  }
);


// ==========================
// 不正解
// ==========================

incorrectBtn.addEventListener(
  'click',
  () => {

    state.incorrectCount++;

    render();
  }
);


// ==========================
// 次へ
// ==========================

nextBtn.addEventListener(
  'click',
  () => {

    state.currentIndex++;

    if (
      state.currentIndex >=
      state.cards.length
    ) {

      state.currentIndex = 0;
    }

    state.isFlipped = false;

    render();
  }
);


// ==========================
// 初期化
// ==========================

startQuiz();

console.log(
  shuffleArray(cardData)
);

console.log(
  shuffleArray(cardData)
);