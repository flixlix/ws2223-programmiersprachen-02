import React from "react";
import axios from "axios";

export default function Query() {
  const [queries, setQueries] = React.useState("");
  React.useEffect(() => {
    axios
      .get("./data.json")
      .then((response) => {
        setQueries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {queries &&
        queries.map((query, index) => (
          <div key={index}>{JSON.stringify(query)}</div>
        ))}
    </div>
  );
}
