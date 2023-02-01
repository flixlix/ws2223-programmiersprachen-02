import React from "react";
import Header from "../src/components/Header/Header";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Stack,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import ProfileSidebar from "../src/components/ProfileSidebar/ProfileSidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageIcon from "@mui/icons-material/Image";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfilePage from "../src/components/Profile/ProfilePage/ProfilePage";
import UploadsPage from "../src/components/Profile/UploadPage/UploadPage";
import SettingsPage from "../src/components/Profile/SettingPage/SettingPage";

export default function profile() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = session?.user;
  const router = useRouter();
  const [userEmail, setUserEmail] = React.useState(
    "luca.ziegler.felix@gmail.com"
  );
  const [username, setUsername] = React.useState("");
  const [userFriendlyName, setUserFriendlyName] = React.useState("");

  const [emailDisabled, setEmailDisabled] = React.useState(true);
  const [menus, setMenus] = React.useState([
    {
      title: "Profile",
      icon: <AccountCircleIcon />,
      component: <ProfilePage />,
      selected: true,
    },
    {
      title: "Uploads",
      icon: <ImageIcon />,
      component: <UploadsPage />,
      selected: false,
    },
    /* {
      title: "Settings",
      icon: <SettingsIcon />,
      component: <SettingsPage />,
      selected: false,
      bottom: true,
    }, */
  ]);
  const [currentMenu, setCurrentMenu] = React.useState(menus[0]);

  function NoProfile() {
    function handleLoginButton() {
      router.push("/login");
    }
    return (
      <div
        className="no-profile-page"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box>
          <Typography variant="h5">
            Please sign in to access your profile
          </Typography>
          <Button variant="outlined" onClick={() => handleLoginButton()}>
            Sign In
          </Button>
        </Box>
      </div>
    );
  }

  function Profile() {
    return (
      <>
        <ProfileSidebar
          menus={menus}
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          setMenus={setMenus}
          sidebarWidth={300}
        />
        <div
          style={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            marginLeft: 300,
          }}
        >
          {currentMenu.component}
        </div>
      </>
    );
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Header />
      {user ? <Profile /> : <NoProfile />}
    </div>
  );
}
