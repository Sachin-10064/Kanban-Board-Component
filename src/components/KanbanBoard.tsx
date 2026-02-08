import { COLUMNS, INITIAL_KANBAN_DATA } from "../constants";
import { useState } from "react";
import type { TKanbanData, TColumnId, ICard } from "../types";
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Card } from "./Card";
import { KanbanColumns } from "./KanbanColumns";

export function KanbanBoard() {
  const [data, setData] = useState<TKanbanData>(INITIAL_KANBAN_DATA);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findColumnOfCard = (cardId: string): TColumnId | undefined => {
    for (const columnId in data) {
      if (data[columnId as TColumnId].find((card) => card.id === cardId)) {
        return columnId as TColumnId;
      }
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    const activeColumn = findColumnOfCard(id as string);
    if (activeColumn) {
      const card = data[activeColumn].find((c) => c.id === id);
      if (card) setActiveCard(card);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeColumnId = findColumnOfCard(active.id as string);
    const overColumnId = COLUMNS.some((c) => c.id === overId)
      ? (overId as TColumnId)
      : findColumnOfCard(overId as string);

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId)
      return;

    setData((prev) => {
      const activeItems = prev[activeColumnId];
      const overItems = prev[overColumnId];

      const activeIndex = activeItems.findIndex((i) => i.id === active.id);
      const overIndex = overItems.findIndex((i) => i.id === overId);

      const newIndex = overIndex >= 0 ? overIndex : overItems.length;

      return {
        ...prev,
        [activeColumnId]: activeItems.filter((i) => i.id !== active.id),
        [overColumnId]: [
          ...overItems.slice(0, newIndex),
          { ...activeItems[activeIndex], columnId: overColumnId },
          ...overItems.slice(newIndex),
        ],
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId) return;

    const activeColumnId = findColumnOfCard(active.id as string);
    const overColumnId = COLUMNS.some((c) => c.id === overId)
      ? (overId as TColumnId)
      : findColumnOfCard(overId as string);

    if (!activeColumnId || !overColumnId || activeColumnId !== overColumnId) {
      setActiveCard(null);
      return;
    }

    const activeIndex = data[activeColumnId].findIndex(
      (i) => i.id === active.id,
    );
    const overIndex = data[activeColumnId].findIndex((i) => i.id === overId);

    if (activeIndex !== overIndex) {
      setData((prev) => ({
        ...prev,
        [activeColumnId]: arrayMove(
          prev[activeColumnId],
          activeIndex,
          overIndex,
        ),
      }));
    }

    setActiveCard(null);
  };

  const handleAddCard = (columnId: TColumnId) => {
    const newCard: ICard = {
      id: Date.now().toString(),
      title: "New Card",
      columnId,
    };
    setData((prevData) => ({
      ...prevData,
      [columnId]: [...prevData[columnId], newCard],
    }));
  };

  const handleEditCard = (
    columnId: TColumnId,
    cardId: string,
    newTitle: string,
  ) => {
    setData((prevData) => ({
      ...prevData,
      [columnId]: prevData[columnId].map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card,
      ),
    }));
  };

  const handleDeleteCard = (columnId: TColumnId, cardId: string) => {
    setData((prevData) => ({
      ...prevData,
      [columnId]: prevData[columnId].filter((card) => card.id !== cardId),
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {COLUMNS.map((col) => (
            <KanbanColumns
              key={col.id}
              cards={data[col.id]}
              column={col}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
            />
          ))}
        </div>
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: "0.5",
                },
              },
            }),
          }}
        >
          {activeCard ? (
            <Card
              card={activeCard}
              borderColor={"gray-500"}
              onDeleteCard={() => {}}
              onEditCard={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
