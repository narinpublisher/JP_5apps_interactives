// ========================================
// ボード全体の状態
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
// 一意なID生成
// ========================================

function generateId(prefix = 'card') {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}


// ========================================
// カード削除（7.7で実装予定）
// ========================================

function deleteCard(cardId, columnId) {

    console.log(
        'カード削除:',
        cardId,
        columnId
    );

}


// ========================================
// カード追加フォーム（7.5で実装予定）
// ========================================

function openAddCardForm(columnId) {

    console.log(
        'カード追加:',
        columnId
    );

}


// ========================================
// カード要素生成
// ========================================

function createCardElement(card, columnId) {

    const cardEl = document.createElement('div');

    cardEl.className = 'kanban-card';
    cardEl.dataset.cardId = card.id;
    cardEl.dataset.columnId = columnId;

    cardEl.draggable = true;

    // カードテキスト

    const textEl = document.createElement('span');
    textEl.textContent = card.text;

    cardEl.appendChild(textEl);

    // 削除ボタン

    const deleteBtn = document.createElement('button');

    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';

    deleteBtn.addEventListener('click', (event) => {

        event.stopPropagation();

        deleteCard(card.id, columnId);

    });

    cardEl.appendChild(deleteBtn);

    // =====================================
    // dragstart
    // =====================================

    cardEl.addEventListener('dragstart', (event) => {

        event.dataTransfer.setData(
            'cardId',
            card.id
        );

        event.dataTransfer.setData(
            'sourceColumnId',
            columnId
        );

        event.dataTransfer.effectAllowed = 'move';

        setTimeout(() => {
            cardEl.classList.add('dragging');
        }, 0);

    });

    // =====================================
    // dragend
    // =====================================

    cardEl.addEventListener('dragend', () => {

        cardEl.classList.remove('dragging');

    });

    return cardEl;
}


// ========================================
// カラム要素生成
// ========================================

function createColumnElement(column) {

    const columnEl = document.createElement('div');

    columnEl.className = 'column';
    columnEl.dataset.columnId = column.id;

    // タイトル

    const titleEl = document.createElement('h2');

    titleEl.className = 'column-title';

    titleEl.textContent =
        `${column.title} (${column.cards.length})`;

    columnEl.appendChild(titleEl);

    // カードリスト

    const cardListEl = document.createElement('div');

    cardListEl.className = 'card-list';
    cardListEl.dataset.columnId = column.id;

    // =====================================
    // dragover
    // =====================================

    cardListEl.addEventListener('dragover', (event) => {

        event.preventDefault();

        event.dataTransfer.dropEffect = 'move';

        cardListEl.classList.add('drag-over');

    });

    // =====================================
    // dragleave
    // =====================================

    cardListEl.addEventListener('dragleave', () => {

        cardListEl.classList.remove('drag-over');

    });

    // =====================================
    // drop
    // =====================================

    cardListEl.addEventListener('drop', (event) => {

        event.preventDefault();

        cardListEl.classList.remove('drag-over');

        const cardId =
            event.dataTransfer.getData('cardId');

        const sourceColumnId =
            event.dataTransfer.getData(
                'sourceColumnId'
            );

        console.log(
            'カード移動:',
            cardId,
            sourceColumnId,
            column.id
        );

        // moveCard(cardId, column.id);
        // 7.4で実装予定

    });

    // カード描画

    column.cards.forEach(card => {

        const cardEl =
            createCardElement(
                card,
                column.id
            );

        cardListEl.appendChild(cardEl);

    });

    columnEl.appendChild(cardListEl);

    // カード追加ボタン

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
// ボード描画
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
// 初期化
// ========================================

window.addEventListener('load', () => {

    render();

});