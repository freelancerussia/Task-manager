import './app/styles/index.css'
import {useState,DragEvent} from "react";


interface Item {
    id: number;
    title: string;
}

interface Board {
    id: number;
    title: string;
    items: Item[];
}


function App() {
    const [boards, setBoards] = useState<Board[]>([
        {
            id: 1,
            title: "Сделать",
            items: [{id: 1, title: "Пойти в магазин",}, {id: 2, title: "Выкинуть мусор"}, {
                id: 3,
                title: "Купить молока",
            }]
        },
        {
            id: 2,
            title: "Проверить",
            items: [{id: 4, title: "Код ревью",}, {id: 5, title: "Задача факториал"}, {
                id: 6,
                title: "Рабоота над ошибками",
            }]
        }, {
            id: 3,
            title: "Сделано",
            items: [{id: 7, title: "Снять видео",}, {id: 8, title: "Политьь цветы"}, {
                id: 9,
                title: "Приготовить ужин",
            }]
        },
    ])
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null)
    const [currentItem, setCurrentItem] = useState<Item | null>(null)
    // const isChanged

    function dragOverHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const target = e.target as HTMLElement;
        if (target.className === 'item') {
            target.style.boxShadow = '0 2px 3px gray'
        }
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>) {
        const target = e.target as HTMLElement;
        target.style.boxShadow = 'none'

    }

    function dragStartHandler( board: Board, item: Item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e: DragEvent<HTMLDivElement>) {
        const target = e.target as HTMLElement;
        target.style.boxShadow = 'none'

    }

    function dropHandler(e: DragEvent<HTMLDivElement>, board: Board, item: Item) {
        e.preventDefault()
        e.stopPropagation();
        if (!currentItem || !currentBoard) return;

        // Если элемент и так на своём месте
        if (currentBoard.id === board.id && currentItem.id === item.id) return;

        // Создаём глубокие копии, чтобы избежать мутаций
        const updatedBoards = [...boards];
        const sourceBoard = updatedBoards.find(b => b.id === currentBoard.id)!;
        const targetBoard = updatedBoards.find(b => b.id === board.id)!;

        // Удаляем из исходной доски
        const currentIndex = sourceBoard.items.findIndex(i => i.id === currentItem.id);
        const [removedItem] = sourceBoard.items.splice(currentIndex, 1);

        // Вставляем в целевую доску перед целевым элементом
        const dropIndex = targetBoard.items.findIndex(i => i.id === item.id);
        targetBoard.items.splice(dropIndex, 0, removedItem);

        setBoards(updatedBoards);
    }

    function dropCardHandler ( e: DragEvent<HTMLDivElement>, board: Board) {
        e.preventDefault();
        if (!currentItem || !currentBoard) return;

        // Если элемент уже в этой доске и это последний элемент
        if (currentBoard.id === board.id &&
            currentBoard.items[currentBoard.items.length - 1].id === currentItem.id) {
            return;
        }

        const updatedBoards = [...boards];
        const sourceBoard = updatedBoards.find(b => b.id === currentBoard.id)!;
        const targetBoard = updatedBoards.find(b => b.id === board.id)!;

        const currentIndex = sourceBoard.items.findIndex(i => i.id === currentItem.id);
        const [removedItem] = sourceBoard.items.splice(currentIndex, 1);

        // Добавляем в конец целевой доски
        targetBoard.items.push(removedItem);
        setBoards(updatedBoards);
    }



    return (
        <div className="app">
            {
                boards.map((board) => {
                    return <div
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e)=>dropCardHandler(e,board)}
                        key={board.id}
                        className="board"
                    >
                        <div className="board__header"><div className="board__title">{board.title}</div> <button >+</button></div>
                        {board.items.map((item) =>
                            <div
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={() => dragStartHandler(board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="item"
                                // onDoubleClick={}
                            >
                                {item.title}
                            </div>
                        )}
                    </div>
                })
            }

        </div>
    )
}

export default App
