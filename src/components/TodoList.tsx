"use client";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoModal from "./TodoModal";
import Todo from "./Todo.type";
import { checkTodo, createTodo, deleteTodo, editTodo } from "./Todo.service";
import useTodos from "./useTodos.hook";

export default function TodoList() {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);

  const { todos, loading, updateTodos } = useTodos();

  function handleClick() {
    setModalOpen(true);
    console.log("Open Modal");
  }

  async function handleChange(id: number, newValue: boolean) {
    await checkTodo(id, newValue);
  }

  function handleEditingChange(editingValues: Todo) {
    setEditingTodo(editingValues);
    setModalOpen(true);
  }

  async function handleEdit(updatedTodo: Todo) {
    await editTodo(updatedTodo.id, updatedTodo);
    setModalOpen(false);
    await updateTodos();
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    await updateTodos();
  }

  async function handleCreate(title: string, description: string) {
    await createTodo(title, description);
    setModalOpen(false);
    await updateTodos();
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          id={todo.id}
          isCompleted={todo.isCompleted ?? false}
          title={todo.title}
          description={todo.description}
          key={todo.id}
          onChange={handleChange}
          onDelete={() => handleDelete(todo.id)}
          onEdit={handleEditingChange}
        />
      ))}
      {loading && <span>"Loading....."</span>}
      <button
        className="p-2 bg-blue-600 rounded-md border border-blue-300 hover:bg-blue-400 active:scale-95 text-white"
        onClick={handleClick}
      >
        Nueva Tarea
      </button>
      {modalIsOpen && (
        <TodoModal
          editingTodo={editingTodo}
          onClose={() => {
            setModalOpen(false);
            setEditingTodo(null);
          }}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
