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
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
/* import css */
import style from "./ImageDetail.module.css";
import ProfileSection from "../ProfileSection/ProfileSection";
import { useRouter } from "next/router";
import getUserMetadataFromId from "../../utils/profiles/getUserMetadataFromId";

export default function ImageDetail({ onClose, open, item, imageSrc }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const session = useSession();
  const [user_metadata, setUserMetadata] = React.useState("");
  const [loggedInLiked, setLoggedInLiked] = React.useState(
    item.likes.includes(session.user.id)
  );
  const [likesCount, setLikesCount] = React.useState(0);
  React.useEffect(() => {
    getUserMetadataFromId({
      supabase,
      user_id: item.user_id,
      setUserMetadata,
    });
  }, []);

  /* handle chip click */
  function handleChipClick(e) {
    /* don't allow spaces */
    const query = e.target.innerText.replace(/\s/g, "+");
    router.push(`/?urlSearchQuery=${query}`);
    onClose();
  }

  React.useEffect(() => {
    if (session.user) {
      if (item.likes.includes(session.user.id)) {
        setLoggedInLiked(true);
      } else {
        setLoggedInLiked(false);
      }
      setLikesCount(item.likes.length);
    }
  }, [supabase, session]);

  React.useEffect(() => {
    if (session.user) {
      if (loggedInLiked === true || loggedInLiked === false)
        setTableLiked(loggedInLiked);
    }
  }, [loggedInLiked]);

  async function setTableLiked(loggedInLiked) {
    const hasUserLiked = item.likes.includes(session.user.id);
    if (!hasUserLiked === loggedInLiked) {
      /* announce change in like or dislike */
      console.log("%c" + "there was a change", "background: #fff; color: #000");
      if (loggedInLiked === true) {
        console.log("%c" + "user liked", "background: #0f0; color: #000");
        item.likes.push(user_metadata.id);
      } else if (loggedInLiked === false) {
        console.log("%c" + "user unliked", "background: #f00; color: #000");
        item.likes = item.likes.filter((likeElement) => {
          likeElement !== user_metadata.id;
        });
      }
    }

    setLikesCount(item.likes.length);
    const { data, error } = await supabase
      .from("photos_metadata")
      /* insert user_metadata.id in array of likes if element does not exist */
      .update({
        likes: item.likes,
      })
      .eq("id", item.id);
    if (error) console.log(error);
    if (data) console.log(data);
  }

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
            <Box
              id="contributor-section"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ProfileSection user_metadata={user_metadata} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography variant="caption">
                  {likesCount + " "}
                  {likesCount === 1 ? "like" : "likes"}
                </Typography>
                <IconButton
                  onClick={() => {
                    setLoggedInLiked(!loggedInLiked);
                  }}
                >
                  {loggedInLiked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>
            </Box>
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
