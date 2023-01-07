import React from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function add() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const supabase = useSupabaseClient();

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

  function handleOnTitleChange(title) {
    setTitle(title);
  }

  function handleOnDescriptionChange(description) {
    setDescription(description);
  }

  function handleOnSubmit() {
    addTodo(title, description);
  }

  async function addTodo(title, description) {
    let { data, error } = await supabase.from("todos").insert([
      {
        id: todos.length + 1,
        created_at: new Date().toISOString(),
        title: title,
        description: description,
        checked: checked,
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
      <h1>Add Todo</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={(event) => handleOnTitleChange(event.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(event) => handleOnDescriptionChange(event.target.value)}
      />
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
      <button onClick={() => handleOnSubmit()}>Submit</button>
    </div>
  );
}
