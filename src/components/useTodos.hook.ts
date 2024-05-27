import { useEffect, useState } from "react";
import Todo from "./Todo.type";
import { getAllTodos } from "../services/supabase/Todo.service";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function updateTodos() {
    setLoading(true);
    const todos = await getAllTodos();
    setTodos(todos);
    setLoading(false);
  }

  useEffect(() => {
    updateTodos();
  }, []);

  return { todos, loading, updateTodos };
}
