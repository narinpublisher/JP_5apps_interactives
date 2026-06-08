// =========================
// アプリ全体の状態
// =========================

const state = {

  cards: [

    {
      question: 'apple',
      answer: 'りんご'
    },

    {
      question: 'book',
      answer: '本'
    },

    {
      question: 'computer',
      answer: 'コンピューター'
    }

  ],

  currentIndex: 0,

  isFlipped: false,

  correctCount: 0,

  incorrectCount: 0

};


// =========================
// 要素取得
// =========================

const cardFront =
  document.querySelector('#cardFront');

const cardNum =
  document.querySelector('#cardNum');

const totalCards =
  document.querySelector('#totalCards');

const correctCount =
  document.querySelector('#correctCount');

const incorrectCount =
  document.querySelector('#incorrectCount');

const nextBtn =
  document.querySelector('#nextBtn');


// =========================
// 画面描画
// =========================

function render() {

  const currentCard =
    state.cards[state.currentIndex];

  cardFront.textContent =
    currentCard.question;

  cardNum.textContent =
    state.currentIndex + 1;

  totalCards.textContent =
    state.cards.length;

  correctCount.textContent =
    state.correctCount;

  incorrectCount.textContent =
    state.incorrectCount;

}


// =========================
// 次のカードへ
// =========================

function nextCard() {

  state.currentIndex++;

  // 最後まで行ったら最初へ戻る
  if (
    state.currentIndex >=
    state.cards.length
  ) {

    state.currentIndex = 0;

  }

  render();

}


// =========================
// イベント
// =========================

nextBtn.addEventListener(
  'click',
  nextCard
);


// =========================
// 初期化
// =========================

render();

console.log(state);