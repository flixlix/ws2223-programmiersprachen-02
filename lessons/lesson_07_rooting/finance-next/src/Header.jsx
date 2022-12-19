import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <AppBar>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>NextJS Financial App</Typography>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/detail">
            <Button disableElevation variant="contained" color="secondary">
              Detail
            </Button>
          </Link>
          <Link href="/form">
            <Button disableElevation variant="contained" color="secondary">
              Form
            </Button>
          </Link>
          <Link href="/api/store">
            <Button disableElevation variant="contained" color="secondary">
              Store
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
