export type TColumnId = "todo" | "in-progress" | "done";

export interface ICard {
  id: string;
  title: string;
  columnId: TColumnId;
}

export interface IColumn {
  id: TColumnId;
  title: string;
  color: string;
}

export type TKanbanData = Record<TColumnId, ICard[]>;
