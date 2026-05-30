// ========================================
// Board State
// ========================================

const boardState = {
    columns: {
        todo: {
            id: 'todo',
            title: '📋 To Do',
            cards: [
                {
                    id: 'card-1',
                    text: 'ランディングページのデザイン修正'
                },
                {
                    id: 'card-2',
                    text: 'ユーザーテストの準備'
                },
                {
                    id: 'card-3',
                    text: 'APIドキュメントを読む'
                }
            ]
        },

        doing: {
            id: 'doing',
            title: '🔄 進行中',
            cards: [
                {
                    id: 'card-4',
                    text: 'ログイン機能の実装'
                }
            ]
        },

        done: {
            id: 'done',
            title: '✅ 完了',
            cards: [
                {
                    id: 'card-5',
                    text: 'プロジェクトキックオフMTG'
                }
            ]
        }
    },

    columnOrder: ['todo', 'doing', 'done']
};


// ========================================
// ID Generator
// ========================================

function generateId(prefix = 'card') {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}


// ========================================
// Card Element
// ========================================

function createCardElement(card, columnId) {

    const cardEl = document.createElement('div');

    cardEl.className = 'kanban-card';
    cardEl.dataset.cardId = card.id;
    cardEl.dataset.columnId = columnId;

    cardEl.textContent = card.text;

    return cardEl;
}


// ========================================
// Column Element
// ========================================

function createColumnElement(column) {

    const columnEl = document.createElement('div');

    columnEl.className = 'column';
    columnEl.dataset.columnId = column.id;

    // Title

    const titleEl = document.createElement('h2');

    titleEl.className = 'column-title';
    titleEl.textContent =
        `${column.title} (${column.cards.length})`;

    columnEl.appendChild(titleEl);

    // Card List

    const cardListEl = document.createElement('div');

    cardListEl.className = 'card-list';
    cardListEl.dataset.columnId = column.id;

    column.cards.forEach(card => {

        const cardEl =
            createCardElement(card, column.id);

        cardListEl.appendChild(cardEl);

    });

    columnEl.appendChild(cardListEl);

    // Add Button

    const addBtn = document.createElement('button');

    addBtn.className = 'add-card-btn';
    addBtn.textContent = '＋ カードを追加';

    addBtn.addEventListener('click', () => {
        openAddCardForm(column.id);
    });

    columnEl.appendChild(addBtn);

    return columnEl;
}


// ========================================
// Render
// ========================================

function render() {

    const board =
        document.querySelector('#board');

    board.innerHTML = '';

    boardState.columnOrder.forEach(columnId => {

        const column =
            boardState.columns[columnId];

        const columnEl =
            createColumnElement(column);

        board.appendChild(columnEl);

    });
}


// ========================================
// Placeholder
// (7.3で実装予定)
// ========================================

function openAddCardForm(columnId) {
    console.log(
        'Add Card:',
        columnId
    );
}


// ========================================
// Initialize
// ========================================

window.addEventListener('load', () => {
    render();
});