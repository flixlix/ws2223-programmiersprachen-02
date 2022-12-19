import React from "react";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Todos() {
  const supabase = useSupabaseClient();
  const [todos, setTodos] = React.useState([]);

  async function initTodos() {
    let { data, error } = await supabase.from("todos").select("*");

    console.log(data);

    if (error) {
      console.error(error);
      return;
    }
    setTodos(data);
  }

  React.useEffect(() => {
    initTodos();
    return () => {};
  }, []);

  async function addTodo() {
    let { data, error } = await supabase.from("todos").insert([
      {
        id: 8,
        created_at: new Date().toISOString(),
        title: "New todo",
        description: "New todo description",
      },
    ]);
    if (error) {
      console.error(error);
      return;
    }
    setTodos(data);
  }
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h2>{todo.title}</h2>
            <ul>
              {/* run through object of todo  */}
              {Object.keys(todo).map((key) => (
                <li key={key}>
                  {key}: <b>{todo[key]}</b>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Link href="/add" passHref>
        <button> Add Todo </button>
      </Link>
    </div>
  );
}
