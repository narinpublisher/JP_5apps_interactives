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


// 動作確認
console.log(boardState);


// ========================================
// ボード描画
// ========================================

function renderBoard() {

    const board = document.getElementById('board');

    board.innerHTML = '';

    boardState.columnOrder.forEach(columnId => {

        const columnData = boardState.columns[columnId];

        const column = document.createElement('div');
        column.className = 'column';

        const title = document.createElement('div');
        title.className = 'column-title';
        title.textContent = columnData.title;

        column.appendChild(title);

        columnData.cards.forEach(cardData => {

            const card = document.createElement('div');

            card.className = 'card';
            card.textContent = cardData.text;

            column.appendChild(card);

        });

        board.appendChild(column);

    });

}


// ========================================
// 初期化
// ========================================

renderBoard();