import React from "react";

interface BoardTitleProps {
    title: string;
}

export const BoardTitle: React.FC<BoardTitleProps> = ({ title }) => {
    return <div className="board__title">{title}</div>;
};