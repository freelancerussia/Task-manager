import {BoardsSchema} from "@entities/Boards";
import {DragStateSchema} from "@features/drag-card/model/types/DragStateSchema.ts";

export interface StateSchema {
    boards: BoardsSchema;
    dragState: DragStateSchema
}