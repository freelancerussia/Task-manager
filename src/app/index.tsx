import './styles/index.css'
import {AppRouter} from "@app/providers/router/ui/AppRouter.tsx";
import {Board, BoardColumn, getBoards} from "@entities/Boards";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@app/providers/StoreProvider";
import {Item} from "@entities/Item";
import {dragStateActions} from "@features/drag-card/model/slice/dragStateSlice.ts";
import {Button} from "@shared/ui/Button/Button.tsx";
import  {useState} from "react";
import {Modal} from "@shared/ui/Modal/Modal.tsx";
import {Input} from "@shared/ui/Input/Input.tsx";
import {boardsActions} from "@entities/Boards/model/slice/boardsSlice.ts";

function Index() {
    const boards = useSelector(getBoards)
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState<string>('');
    // const {onDragEnd,onDragStart} = useDragState()
    const dispatch = useDispatch<AppDispatch>();

    const onDragStartHandler = (board: Board, item: Item) => {
        dispatch(dragStateActions.setDragStart({ board, item }));
    };

    const onDragEndHandler = () => {
        dispatch(dragStateActions.setDragEnd());
    };

    const addBoard = () => {
        if(!newBoardTitle) return
        dispatch(boardsActions.addBoard({id:boards.length + 1,items:[], title: newBoardTitle}))
        setIsOpenModal(false)
        setNewBoardTitle('')
    }
    return (
        <div className="app">
            {boards.map((board) => (
                <BoardColumn
                    key={board.id}
                    board={board}
                    onDragStart={onDragStartHandler}
                    onDragEnd={onDragEndHandler}

                />
            ))}
            <Button onClick={()=>setIsOpenModal(true)}>Добавить доску</Button>
            <Modal isOpen={isOpenModal} onClose={()=>setIsOpenModal(false)}>
                <div>Как хотите назвать доску?</div>
                <Input value={newBoardTitle} onChange={setNewBoardTitle}/>
                <Button style={{width:'100%', marginTop:'5px'}} onClick={addBoard}>Добавить</Button>
            </Modal>
            <AppRouter/>
        </div>
    )
}

export default Index
