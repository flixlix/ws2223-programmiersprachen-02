import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import styles from "../styles/Form.module.css";
import Header from "../src/Header";
import axios from "axios";

export default function form() {
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  function handleOnCategoryChange(event: any) {
    setCategory(event.target.value);
  }

  function handleOnAmountChange(event: any) {
    setAmount(event.target.value);
  }

  function handleSubmit(event: any) {
    if (category === "" || amount === 0) return;
    const payload = {
      category: category,
      amount: amount,
    };
    console.log(payload);
    axios.post("/api/store", payload);
    setCategory("");
    setAmount(0);
  }

  return (
    <div className={styles.form}>
      <Header />
      <Typography variant="h2">Form</Typography>
      <TextField
        required
        fullWidth
        className={styles.category}
        label="Category"
        onChange={handleOnCategoryChange}
        value={category}
      />
      <TextField
        required
        fullWidth
        label="Amount"
        onChange={handleOnAmountChange}
        value={amount}
      />

      <Typography variant="body1">
        Category: {category || "______"} - Amount: {amount}€
      </Typography>
      <Button disableElevation variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
