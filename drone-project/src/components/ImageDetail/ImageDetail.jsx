import React from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Typography,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
/* import css */
import style from "./ImageDetail.module.css";
import ProfileSection from "../ProfileSection/ProfileSection";


export default function ImageDetail({ onClose, open, item, imageSrc }) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [user_metadata, setUserMetadata] = React.useState({ id: "" });

  async function getImgSizeFromUrl(url) {
    /* return in MB */
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const size = img.src.length;
        resolve(size);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  getImgSizeFromUrl(imageSrc)
    .then((size) => {
      console.log(size);
    })
    .catch((error) => {
      console.log(error);
    });

  /* handle chip click */
  function handleChipClick(e) {
    console.log(e.target.innerText);
  }

  async function getUserMetadata() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", item.user_id);
    if (error) {
      console.log(error);
    }
    setUserMetadata(data?.[0]);
  }

  React.useEffect(() => {
    getUserMetadata();
  }, []);
  React.useEffect(() => {
    console.log(user_metadata);
    console.log(user_metadata.friendly_name);
  }, [user_metadata]);

  return (
    <Dialog onClose={() => onClose()} open={open} maxWidth="xl" fullWidth>
      <DialogTitle>
        {item.name}
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* container for image */}
        <div id="image-container" className={style.image_container}>
          <img
            id="image"
            className={style.image}
            alt={item.name}
            loading="lazy"
            src={imageSrc}
          />
        </div>
        <div id="description-container" className={style.description_container}>
          <div id="left-side-description-container">
            <div id="contributor-section">
              <ProfileSection user_metadata={user_metadata} />
            </div>
            <p>{item.description}</p>
            <p>
              <strong>Image Name:</strong> {item.name}
            </p>
            <p>
              <strong>Image Path:</strong> {item.image_path}
            </p>
            <p>
              <strong>Image Created:</strong> {item.created_at}
            </p>
            <p>
              <strong>User id:</strong> {item.user_id}
              <strong> Username:</strong>{" "}
              {user_metadata?.username || "anonymous"}
            </p>
          </div>
          <div id="right-side-description-container">
            <Typography variant="h6" component="h6">
              Tags
              <Typography variant="caption">
                {" ("}
                {item.tags.length}
                {"/50)"}
              </Typography>
            </Typography>
            <div className={style.tag_container}>
              {/* separate between elements in array with comma */}
              {item.tags.map((tag, index) => {
                return <Chip label={tag} onClick={(e) => handleChipClick(e)} />;
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
