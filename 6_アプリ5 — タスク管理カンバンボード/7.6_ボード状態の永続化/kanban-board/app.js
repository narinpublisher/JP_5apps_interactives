const STORAGE_KEY = 'kanban-board';

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

function generateId(prefix = 'card') {

    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

}

function saveToStorage() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(boardState)
    );

}

function loadFromStorage() {

    const savedData =
        localStorage.getItem(
            STORAGE_KEY
        );

    if (!savedData) {
        return;
    }

    try {

        const parsedState =
            JSON.parse(savedData);

        boardState.columns =
            parsedState.columns;

        boardState.columnOrder =
            parsedState.columnOrder;

    }
    catch (error) {

        console.error(
            '保存データの読み込み失敗',
            error
        );

    }

}

function deleteCard(cardId, columnId) {

    console.log(
        'カード削除',
        cardId,
        columnId
    );

}

function openAddCardForm(columnId) {

    console.log(
        'カード追加',
        columnId
    );

}

function moveCard(
    cardId,
    sourceColumnId,
    targetColumnId
) {

    if (sourceColumnId === targetColumnId) {
        return;
    }

    const sourceCards =
        boardState.columns[sourceColumnId].cards;

    const cardIndex =
        sourceCards.findIndex(
            card => card.id === cardId
        );

    if (cardIndex === -1) {
        return;
    }

    const [movedCard] =
        sourceCards.splice(cardIndex, 1);

    boardState
        .columns[targetColumnId]
        .cards
        .push(movedCard);

    saveToStorage();

    render();

}

function setupDropZone(
    cardListEl,
    columnId
) {

    cardListEl.addEventListener(
        'dragover',
        (event) => {

            event.preventDefault();

            event.dataTransfer.dropEffect =
                'move';

            cardListEl.classList.add(
                'drag-over'
            );

            cardListEl
                .closest('.column')
                ?.classList.add(
                    'drag-over-column'
                );

        }
    );

    cardListEl.addEventListener(
        'dragleave',
        () => {

            cardListEl.classList.remove(
                'drag-over'
            );

            cardListEl
                .closest('.column')
                ?.classList.remove(
                    'drag-over-column'
                );

        }
    );

    cardListEl.addEventListener(
        'drop',
        (event) => {

            event.preventDefault();

            cardListEl.classList.remove(
                'drag-over'
            );

            cardListEl
                .closest('.column')
                ?.classList.remove(
                    'drag-over-column'
                );

            const cardId =
                event.dataTransfer.getData(
                    'cardId'
                );

            const sourceColumnId =
                event.dataTransfer.getData(
                    'sourceColumnId'
                );

            moveCard(
                cardId,
                sourceColumnId,
                columnId
            );

        }
    );

}

function createCardElement(
    card,
    columnId
) {

    const cardEl =
        document.createElement('div');

    cardEl.className =
        'kanban-card';

    cardEl.dataset.cardId =
        card.id;

    cardEl.draggable = true;

    const textEl =
        document.createElement('span');

    textEl.textContent =
        card.text;

    cardEl.appendChild(textEl);

    const deleteBtn =
        document.createElement('button');

    deleteBtn.className =
        'delete-btn';

    deleteBtn.textContent =
        '×';

    deleteBtn.addEventListener(
        'click',
        (event) => {

            event.stopPropagation();

            deleteCard(
                card.id,
                columnId
            );

        }
    );

    cardEl.appendChild(deleteBtn);

    cardEl.addEventListener(
        'dragstart',
        (event) => {

            event.dataTransfer.setData(
                'cardId',
                card.id
            );

            event.dataTransfer.setData(
                'sourceColumnId',
                columnId
            );

            event.dataTransfer.effectAllowed =
                'move';

            setTimeout(() => {

                cardEl.classList.add(
                    'dragging'
                );

            }, 0);

        }
    );

    cardEl.addEventListener(
        'dragend',
        () => {

            cardEl.classList.remove(
                'dragging'
            );

        }
    );

    return cardEl;

}

function createColumnElement(
    column
) {

    const columnEl =
        document.createElement('div');

    columnEl.className =
        'column';

    const titleEl =
        document.createElement('h2');

    titleEl.className =
        'column-title';

    titleEl.textContent =
        `${column.title} (${column.cards.length})`;

    columnEl.appendChild(titleEl);

    const cardListEl =
        document.createElement('div');

    cardListEl.className =
        'card-list';

    setupDropZone(
        cardListEl,
        column.id
    );

    column.cards.forEach(card => {

        const cardEl =
            createCardElement(
                card,
                column.id
            );

        cardListEl.appendChild(
            cardEl
        );

    });

    columnEl.appendChild(
        cardListEl
    );

    const addBtn =
        document.createElement('button');

    addBtn.className =
        'add-card-btn';

    addBtn.textContent =
        '＋ カードを追加';

    addBtn.addEventListener(
        'click',
        () => {

            openAddCardForm(
                column.id
            );

        }
    );

    columnEl.appendChild(addBtn);

    return columnEl;

}

function render() {

    const board =
        document.querySelector('#board');

    board.innerHTML = '';

    boardState.columnOrder.forEach(
        columnId => {

            const column =
                boardState.columns[columnId];

            const columnEl =
                createColumnElement(
                    column
                );

            board.appendChild(
                columnEl
            );

        }
    );

}

window.addEventListener(
    'load',
    () => {

        loadFromStorage();

        render();

    }
);