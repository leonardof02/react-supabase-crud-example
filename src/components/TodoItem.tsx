"use client";
import React from "react";
import Todo from "./Todo.type";

interface Props {
  id: number;
  isCompleted: boolean;
  title: string;
  description: string;
  onEdit?: (editingTodo: Todo) => void;
  onDelete?: () => void;
  onChange?: (id: number, newValue: boolean) => void;
}

export default function Todo({
  id,
  description,
  isCompleted,
  title,
  onChange,
  onEdit,
  onDelete,
}: Props) {
  function handleCheck() {
    if (!onChange) return;
    onChange(id, !isCompleted);
  }

  function handleEditClick() {
    onEdit && onEdit({ id, title, description });
  }

  return (
    <div className="flex group items-center gap-5 w-[400px] justify-between">
      <div className="flex items-center p-4 bg-slate-100 gap-3 rounded-md shadow-md hover:shadow-lg cursor-pointer flex-grow transition-all">
        <input type="checkbox" checked={isCompleted} className="" onClick={handleCheck} readOnly />
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="font-sm text-slate-600">{description}</p>
        </div>
      </div>
      <div className="gap-2 group-hover:flex hidden">
        <button
          className="cursor-pointer active:scale-95 p-2 border-slate-400 border bg-slate-200 rounded-md"
          onClick={handleEditClick}
        >
          ✏️
        </button>
        <button
          className="cursor-pointer active:scale-95 p-2 border-slate-400 border bg-slate-200 rounded-md"
          onClick={onDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
