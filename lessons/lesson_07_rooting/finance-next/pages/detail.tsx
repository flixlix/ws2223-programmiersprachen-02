import { Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import React from "react";
import Header from "../src/Header";

export default function detail() {
  const [data, setData] = React.useState([]);

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    axios.get("/api/store").then((res) => {
      setData(res.data);
    });
  }, [isRefreshing]);

  function onRefreshClick() {
    setIsRefreshing(!isRefreshing);
  }

  return (
    <>
      <Header />
      <List style={{ margin: "5rem auto" }}>
        {data.map((item: any) => {
          return (
            <ListItem key={item.category + item.amount}>
              <ListItemText primary={item.category} secondary={item.amount} />
            </ListItem>
          );
        })}
      </List>
      <Button onClick={onRefreshClick}>Refresh</Button>
    </>
  );
}
