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
function deleteCard(
    cardId,
    columnId
) {

    const confirmed =
        window.confirm(
            'このカードを削除しますか？'
        );

    if (!confirmed) {
        return;
    }

    boardState.columns[columnId].cards =
        boardState.columns[columnId].cards.filter(
            card => card.id !== cardId
        );

    saveToStorage();

    render();

}

function openAddCardForm(
    columnId
) {

    const existingForm =
        document.querySelector(
            '.add-card-form'
        );

    if (existingForm) {
        existingForm.remove();
    }

    const form =
        document.createElement('div');

    form.className =
        'add-card-form';

    const textarea =
        document.createElement(
            'textarea'
        );

    textarea.placeholder =
        'タスクを入力してください...';

    textarea.className =
        'add-card-textarea';

    textarea.rows = 3;

    form.appendChild(
        textarea
    );

    const buttonsDiv =
        document.createElement(
            'div'
        );

    buttonsDiv.className =
        'form-buttons';

    const confirmBtn =
        document.createElement(
            'button'
        );

    confirmBtn.textContent =
        '追加';

    confirmBtn.className =
        'btn-confirm';

    confirmBtn.addEventListener(
        'click',
        () => {

            const text =
                textarea.value.trim();

            if (text) {

                addCard(
                    columnId,
                    text
                );

            }

        }
    );

    const cancelBtn =
        document.createElement(
            'button'
        );

    cancelBtn.textContent =
        'キャンセル';

    cancelBtn.className =
        'btn-cancel';

    cancelBtn.addEventListener(
        'click',
        () => {

            form.remove();

        }
    );

    buttonsDiv.appendChild(
        confirmBtn
    );

    buttonsDiv.appendChild(
        cancelBtn
    );

    form.appendChild(
        buttonsDiv
    );

    const columnEl =
        document.querySelector(
            `[data-column-id="${columnId}"]`
        );

    columnEl.appendChild(
        form
    );

    textarea.focus();

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

function addCard(
    columnId,
    text
) {

    const newCard = {
        id: generateId(
            'card'
        ),
        text: text
    };

    boardState
        .columns[columnId]
        .cards
        .push(
            newCard
        );

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
    document.createElement(
        'div'
    );

columnEl.className =
    'column';

columnEl.dataset.columnId =
    column.id;

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