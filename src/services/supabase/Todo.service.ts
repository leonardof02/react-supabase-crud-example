import supabase from "@/services/supabase/supabaseClient";
import Todo from "../../components/Todo.type";

async function checkTodo(id: number, newValue: boolean) {
  const { error } = await supabase.from("Todo").update({ isCompleted: newValue }).eq("id", id);
  if (error) throw error;
}

async function getAllTodos() {
  const { data, error } = await supabase.from("Todo").select();
  if (error) throw error;
  return data;
}

async function editTodo(id: number, editingTodoValues: Todo) {
  if (id == null) return;
  const { title, description } = editingTodoValues;
  const { error } = await supabase.from("Todo").update({ title, description }).eq("id", id);
  if (error) throw error;
}

async function deleteTodo(id: number) {
  const { error } = await supabase.from("Todo").delete().eq("id", id);
  if (error) throw error;
}

async function createTodo(title: string, description: string) {
  const { error } = await supabase.from("Todo").insert({ title, description });
  if (error) throw error;
}

export { checkTodo, editTodo, deleteTodo, createTodo, getAllTodos };
