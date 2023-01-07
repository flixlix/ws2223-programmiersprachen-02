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
import { useRouter } from "next/router";

export default function ImageDetail({ onClose, open, item, imageSrc }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const session = useSession();
  const [user_metadata, setUserMetadata] = React.useState({ id: "" });

  /* handle chip click */
  function handleChipClick(e) {
    console.log(e.target.innerText);
    /* don't allow spaces */
    const query = e.target.innerText.replace(/\s/g, "+");
    router.push(`/?urlSearchQuery=${query}`);
    onClose();
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

  return (
    <Dialog onClose={() => onClose()} open={open} maxWidth="lg" fullWidth>
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
                return (
                  <Chip
                    key={index}
                    label={tag}
                    onClick={(e) => handleChipClick(e)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
