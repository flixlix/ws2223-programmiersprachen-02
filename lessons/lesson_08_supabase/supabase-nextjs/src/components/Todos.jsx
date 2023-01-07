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
  }, [todos]);

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

  async function setChecked(id, status) {
    let { data, error } = await supabase
      .from("todos")
      .update({ checked: !status })
      .match({ id: id });
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
        {todos
          ? todos.map((todo) => (
              <li key={todo.id}>
                <h2>
                  <input
                    type="checkbox"
                    onChange={() => {
                      setChecked(todo.id, todo.checked);
                    }}
                    checked={todo.checked}
                  />
                  {todo.title}
                </h2>
                <ul>
                  {/* run through object of todo  */}
                  {/* {Object.keys(todo).map((key) => (
                <li key={key}>
                  {key}: <b>{todo[key].toString()}</b>
                </li>
              ))} */}
                </ul>
              </li>
            ))
          : null}
      </ul>
      <Link href="/add" passHref>
        <button> Add Todo </button>
      </Link>
    </div>
  );
}
