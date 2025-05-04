import React, {DragEvent, useState} from "react";
import {Board} from "entities/Boards";
import {useDropHandlers} from "@features/drag-card/ui/useDrop.ts";
import {BoardTitle} from "@shared/ui/BoardTitle/BoardTitle.tsx";
import {Item} from "@entities/Item";
import {ItemCard} from "@entities/Item/ui/ItemCard.tsx";
import {boardsActions} from "@entities/Boards/model/slice/boardsSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@app/providers/StoreProvider";
import {Modal} from "@shared/ui/Modal/Modal.tsx";
import {Input} from "@shared/ui/Input/Input.tsx";
import {Button} from "@shared/ui/Button/Button.tsx";


interface BoardColumnProps {
    board: Board;
    onDragStart: (board: Board, item: Item) => void;
    onDragEnd: (e:DragEvent<HTMLDivElement>) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
                                                            board,
                                                            onDragStart,
                                                            onDragEnd,
                                                        }) => {
    const { onDropItem, onDropBoard, onDragOver, onDragLeave } = useDropHandlers();
    const dispatch = useDispatch<AppDispatch>();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [itemTitle, setItemTitle] = useState<string>("");

    const addItem = () => {
        if(!itemTitle) return
        dispatch(boardsActions.addItem({boardId:board.id, title:itemTitle}))
        setIsOpenModal(false)
        setItemTitle('')
    }

    return (
        <div
            onDragOver={onDragOver}
            onDrop={() => onDropBoard(board)}
            key={board.id}
            className="board"
        >
            <BoardTitle title={board.title} addItem={()=>setIsOpenModal(true)}/>
            {board.items.length === 0 ? 'Задач нет' : board.items.map((item) => (
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={() => onDropItem(board, item)}
                    key={item.id}
                    draggable={true}
                >
                    <ItemCard
                        item={item}
                        board={board}
                        onDragStart={onDragStart}
                        onDragEnd={(e)=>onDragEnd(e)}
                    />
                </div>
            ))}
            <Modal isOpen={isOpenModal} onClose={()=>setIsOpenModal(false)}>
                <div>Что хотите сделать?</div>
                <Input value={itemTitle} onChange={setItemTitle}/>
                <Button style={{width:'100%', marginTop:'5px'}} onClick={addItem}>Добавить</Button>
            </Modal>
        </div>
    );
};