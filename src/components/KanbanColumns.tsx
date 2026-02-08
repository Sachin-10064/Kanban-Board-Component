import { Card } from "./Card";
import type { ICard, IColumn, TColumnId } from "../types";
import { PlusIcon } from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export function KanbanColumns({
  cards,
  column,
  onAddCard,
  onDeleteCard,
  onEditCard,
}: {
  cards: ICard[];
  column: IColumn;
  onAddCard: (columnId: TColumnId) => void;
  onDeleteCard: (columnId: TColumnId, cardId: string) => void;
  onEditCard: (columnId: TColumnId, cardId: string, newTitle: string) => void;
}) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className="flex overflow-y-auto py-2 ">
      <div className="border-2 rounded-lg border-gray-200 overflow-hidden w-[400px]">
        {/* Header */}
        <div
          className={`flex justify-between items-center p-2 h-[50px] bg-${column.color}`}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-white font-bold">{column.title}</h2>
            <span className="w-8 h-6 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white">
              {cards.length}
            </span>
          </div>
          <button
            onClick={() => onAddCard(column.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-white/90 transition-colors"
            title="Add new card"
          >
            <PlusIcon size={16} />
          </button>
        </div>

        <div className="p-2">
          <button
            onClick={() => onAddCard(column.id)}
            className="flex items-center gap-2 justify-center rounded-lg bg-white hover:bg-white/90 transition-colors border-2 border-gray-200 px-4 py-1"
            title="Add new card"
          >
            <PlusIcon size={16} /> Add Card
          </button>
        </div>
        <div
          ref={setNodeRef}
          className="flex-1 p-3 flex flex-col gap-3 min-h-[200px]"
        >
          <SortableContext
            items={cards.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                borderColor={column.color}
                onDeleteCard={onDeleteCard}
                onEditCard={onEditCard}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
