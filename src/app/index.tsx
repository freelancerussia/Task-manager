import './styles/index.css'
import {useState} from "react";
import {BoardColumn} from "../widgets/board-column";
import {useDragState} from "@features/drag-card/model/useDrag.ts";

interface Item {
    id: number;
    title: string;
}

interface Board {
    id: number;
    title: string;
    items: Item[];
}


function Index() {
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
    const {currentItem,currentBoard,onDragEnd,onDragStart} = useDragState()
    return (
        <div className="app">
            {boards.map((board) => (
                <BoardColumn
                    key={board.id}
                    board={board}
                    boards={boards}
                    setBoards={setBoards}
                    onDragStart={onDragStart}
                    onDragEnd={(e)=>onDragEnd(e)}
                    currentBoard={currentBoard}
                    currentItem={currentItem}
                />
            ))}
        </div>
    )
}

export default Index
