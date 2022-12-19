import Fuse from "fuse.js";
import React from "react";
import {
  Form,
  TextField,
  Button,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function testing() {
  const [query, setQuery] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json"
      )
      .then((res) => {
        setMovies(res.data.movies);
      });
  }, []);

  const fuse = new Fuse(movies, {
    keys: ["actors", "director", "plot", "title", "year"],
    includeScore: true,
    isCaseSensitive: false,
    threshold: 0.3,
  });

  React.useEffect(() => {
    /* if (query === "") {
      console.log(movies);
      setResults((results.item = movies));
      return;
    } */
    setResults(fuse.search(query));

    console.log(results);
  }, [query, movies]);

  function handleChangeQuery(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setQuery("");
  }

  return (
    <div>
      <TextField
        fullWidth
        onSubmit={handleSubmit}
        id="search-input"
        placeholder="Search"
        value={query}
        onChange={handleChangeQuery}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      {results.map((result) => (
        <div key={result.item.id} style={{ padding: "1rem 0" }}>
          <Typography variant="p">
            <b>Movie Title: </b> {result.item.title}
          </Typography>
          <ul style={{ marginTop: "0px" }}>
            <li>
              <Grid container columns={4} spacing={2}>
                <Grid item xs={1}>
                  <Typography variant="p">Plot:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="p">{result.item.plot}</Typography>
                </Grid>
              </Grid>
            </li>
            <li>
              <Grid container columns={4} spacing={2}>
                <Grid item xs={1}>
                  <Typography variant="p">Year:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="p">{result.item.year}</Typography>
                </Grid>
              </Grid>
            </li>
            <li>
              <Grid container columns={4} spacing={2}>
                <Grid item xs={1}>
                  <Typography variant="p">Director:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="p">{result.item.director}</Typography>
                </Grid>
              </Grid>
            </li>
            <li>
              <Grid container columns={4} spacing={2}>
                <Grid item xs={1}>
                  <Typography variant="p">Actors:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="p">{result.item.actors}</Typography>
                </Grid>
              </Grid>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
