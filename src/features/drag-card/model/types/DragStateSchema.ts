import {Board} from "@entities/Boards";
import {Item} from "@entities/Item";

export type  DragStateSchema = {
    currentBoard: Board | null;
    currentItem: Item | null;
}
