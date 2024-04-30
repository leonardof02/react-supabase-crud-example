"use client";
import React, { ChangeEvent, useState } from "react";
import Todo from "./Todo.type";

interface Props {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
  onEdit: (updatedTodo: Todo) => void;
  editingTodo: Todo | null;
}

interface InputValues {
  title: string;
  description: string;
}

export default function TodoModal({ onClose, onCreate, onEdit, editingTodo }: Props) {
  const [inputValues, setInputValues] = useState<InputValues>({
    title: editingTodo?.title ?? "",
    description: editingTodo?.description ?? "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }

  function handleEdit() {
    if (inputValues.title.length < 0 || inputValues.description.length < 0 || !editingTodo) return;
    const updatedTodo: Todo = {
      id: editingTodo.id,
      title: inputValues.title,
      description: inputValues.description,
    };
    onEdit(updatedTodo);
  }

  function handleCreate() {
    if (inputValues.title.length < 0 || inputValues.description.length < 0) return;
    onCreate(inputValues.title, inputValues.description);
  }

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen bg-opacity-50 bg-black flex justify-center items-center z-0"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg flex-col flex p-6 gap-3 z-10">
        {editingTodo ? (
          <h6 className="text-2xl">Editar tarea</h6>
        ) : (
          <h6 className="text-2xl">Crear nueva tarea</h6>
        )}
        <input
          placeholder="Title"
          name="title"
          className="border p-2"
          value={inputValues.title}
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Description"
          name="description"
          className="border p-2"
          value={inputValues.description}
          onChange={handleChange}
        ></textarea>
        {editingTodo ? (
          <button
            className="p-2 bg-blue-600 rounded-md border border-blue-300 hover:bg-blue-400 active:scale-95 text-white"
            onClick={handleEdit}
          >
            Editar tarea
          </button>
        ) : (
          <button
            className="p-2 bg-blue-600 rounded-md border border-blue-300 hover:bg-blue-400 active:scale-95 text-white"
            onClick={handleCreate}
          >
            Crear Tarea
          </button>
        )}
      </div>
    </div>
  );
}
