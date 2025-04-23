import {FC} from "react";

interface BoardTitleProps {
    title: string;
    addItem: () => void;
}

export const BoardTitle: FC<BoardTitleProps> = ({ title,addItem }) => {
    return  <div className="board__header"><div className="board__title">{title}</div> <button onClick={addItem} >+</button></div>
};