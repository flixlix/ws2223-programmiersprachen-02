import React from "react";
import FuzzySearch from "react-fuzzy";
import TextField from "@mui/material/TextField";

export default function fuzzy() {
  const products = [
    {
      id: 1,
      name: "Adidas Superstar",
      description: "Originals",
      category: "Originals",
      price: 100,
      stock: 10,
      image: "./product_images/adidas_superstar.png",
    },
    {
      id: 2,
      name: "Adidas NMD_R1",
      description: "Men Originals",
      category: "Men Originals",
      price: 150,
      stock: 10,
      image: "./product_images/adidas_nmd_r1.jpg",
    },
    {
      id: 3,
      name: "Adidas Gazelle",
      description: "Originals",
      category: "Originals",
      price: 85,
      stock: 10,
      image: "./product_images/adidas_gazelle.png",
    },
  ];
  const list = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    },
    {
      id: 2,
      title: "The DaVinci Code",
      author: "Dan Brown",
    },
    {
      id: 3,
      title: "Angels & Demons",
      author: "Dan Brown",
    },
  ];
  return (
    <div>
      <TextField label="Search" variant="standard" />
      <FuzzySearch
        list={products}
        shouldShowDropdownAtStart={true}
        keys={["name", "description", "category"]}
        width={430}
        threshold={0.6}
        onSelect={(newSelectedItem) => {
          // Local state setter defined elsewhere
          setSelectedItem(newSelectedItem);
        }}
        resultsTemplate={(props, state, styles, clickHandler) => {
          return state.results.map((val, i) => {
            const style =
              state.selectedIndex === i
                ? styles.selectedResultStyle
                : styles.resultsStyle;
            return (
              <div key={i} style={style} onClick={() => clickHandler(i)}>
                {val.name}
                <span style={{ float: "right", opacity: 0.5 }}>
                  in {val.category}
                </span>
              </div>
            );
          });
        }}
      />
    </div>
  );
}
