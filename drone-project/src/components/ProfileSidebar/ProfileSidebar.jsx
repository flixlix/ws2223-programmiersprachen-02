import React from "react";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";

export default function ProfileSidebar({
  menus,
  currentMenu,
  setCurrentMenu,
  setMenus,
  sidebarWidth,
}) {
  function handleClickMenu(e, index) {
    e.preventDefault();
    setMenus((prevMenus) => {
      const newMenus = [...prevMenus];
      newMenus[index].selected = true;
      currentMenu.selected = false;
      setCurrentMenu(newMenus[index]);
      return newMenus;
    });
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer - 1000,
        width: sidebarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sidebarWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", paddingInline: 2, height: "100%" }}>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            /* padding on top and bottom */
            paddingBlock: 2,
            gap: 1,
          }}
        >
          {menus.map((item, index) => (
            <ListItem
              sx={{
                marginTop: item.bottom ? "auto" : 0,
              }}
              key={index}
              disablePadding
            >
              <ListItemButton
                onClick={(e) => handleClickMenu(e, index)}
                selected={item.selected}
                sx={{
                  borderRadius: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    marginLeft: 0.5,
                    color: item.selected
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.text.secondary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: item.selected
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.text.secondary,
                  }}
                  selected={item.selected}
                  primary={item.title}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
