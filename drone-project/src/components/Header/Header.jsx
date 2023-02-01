import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import styles from "../Header/Header.module.css";
import { ListItem, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { matchSorter } from "match-sorter";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ElevationScroll from "./ElevationScroll.js";
import ActiveAvatar from "../ProfileSection/ActiveAvatar/ActiveAvatar";
/* import useScrollTrigger from "@mui/material/useScrollTrigger"; */

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ searchQuery, setSearchQuery }, props) {
  const router = useRouter();
  const session = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const supabase = useSupabaseClient();
  let refInput = React.useRef("search");
  let rfeInput = React.useRef("searhc");
  const filterOptions = (options, { inputValue }) => {
    return matchSorter(options, inputValue);
  };

  const [searchOptions, setSearchOptions] = React.useState([
    { title: "Title", id: "title", active: true },
    { title: "Description", id: "description", active: true },
    { title: "Tags", id: "tags", active: true },
    { title: "Author", id: "author", active: true },
  ]);

  const [user_metadata, setUserMetadata] = React.useState(null);

  async function getUserMetadata() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id);
    if (error) {
      console.log(error);
    }
    if (data) setUserMetadata(data[0]);
  }

  React.useEffect(() => {
    if (session) {
      getUserMetadata();
    }
  }, [session]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    if (session) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={() => router.push("/add")}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <AddIcon />
        </IconButton>
        <p>New Photo</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  function handleProfileClick(e) {
    e.preventDefault();
    router.push("/profile");
  }

  function handleChipClick(id) {
    setSearchOptions(
      searchOptions.map((option) => {
        if (option.id === id) {
          return { ...option, active: !option.active };
        }
        return option;
      })
    );
  }

  return (
    <Box style={{ marginBottom: "64px" }}>
      <ElevationScroll {...props}>
        <AppBar className={styles.appbar}>
          <Toolbar
            className={styles.toolbar}
            sx={{
              marginInline: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => router.push("/")}
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <HomeIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, marginRight: 3 }}
              >
                Drone Photos
              </Typography>
              {setSearchQuery && (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                  {/* {searchOptions &&
                    searchOptions.map((option) => (
                      <Chip
                        key={option.id}
                        label={option.title}
                        onClick={() => {
                          handleChipClick(option.id);
                        }}
                        variant={option.active ? "default" : "outlined"}
                        sx={{
                          boxSizing: "border-box",
                          backgroundColor: option.active
                            ? "white"
                            : "transparent",
                        }}
                        style={{
                          "&:hover": {
                            backgroundColor: option.active
                              ? "white"
                              : "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                        clickable
                      />
                    ))} */}
                </Search>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                onClick={() => router.push("/add")}
              >
                <AddIcon />
              </IconButton>
              {session && (
                <Link href="/profile">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    {session ? (
                      <ActiveAvatar
                        user_metadata={user_metadata}
                        handleClick={(e) => handleProfileClick(e)}
                      />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                </Link>
              )}
            </Box>
            {/* <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </Box>
  );
}
