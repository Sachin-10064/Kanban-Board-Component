import { Pencil, TrashIcon } from "lucide-react";
import type { ICard, TColumnId } from "../types";
import { useEffect, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export function Card({
  card,
  borderColor,
  onDeleteCard,
  onEditCard,
}: {
  card: ICard;
  borderColor: string;
  onDeleteCard: (columnId: TColumnId, cardId: string) => void;
  onEditCard: (columnId: TColumnId, cardId: string, newTitle: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editedTitle.trim() && editedTitle !== card.title) {
      onEditCard(card.columnId, card.id, editedTitle);
    } else {
      setEditedTitle(card.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedTitle(card.title);
    }
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-md shadow-sm p-3 mb-2 border border-gray-200 flex justify-between items-start cursor-grab active:cursor-grabbing hover:shadow-md hover:border-slate-300 hover:bg-slate-50 transition-all`}
    >
      <div className="flex gap-2">
        <div className={`border-l-4 border-${borderColor} rounded-md h-14`} />
        {isEditing ? (
          <textarea
            ref={inputRef}
            className="flex-1 text-sm font-medium text-slate-700 bg-slate-50 p-1 rounded border-none focus:ring-2 focus:ring-blue-400 resize-none outline-none"
            rows={2}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p className="text-sm font-medium text-gray-700">{card.title}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-slate-300 hover:text-green-300 transition-colors cursor-pointer"
          title="Edit card"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDeleteCard(card.columnId, card.id)}
          className="text-slate-300 hover:text-red-300 transition-colors cursor-pointer"
          title="Delete card"
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
}
