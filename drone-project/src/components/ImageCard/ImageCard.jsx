import React from "react";
import { Paper, Skeleton } from "@mui/material";
import ImageDetail from "../ImageDetail/ImageDetail";
import {
  Card,
  CardCover,
  CardContent,
  AspectRatio,
  Typography,
} from "@mui/joy";
import style from "./ImageCard.module.css";

export default function ImageCard({ item, hoverNoTitle, handleImgClick }) {
  const [loading, setLoading] = React.useState(true);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [aspectRatio, setAspectRatio] = React.useState(1);
  const [hoverState, setHoverState] = React.useState(false);
  const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imageSrc = `${publicUrl}/storage/v1/object/public/photos/${item.image_path}`;

  function getImageAspectRatioFromUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        resolve(aspectRatio);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  getImageAspectRatioFromUrl(imageSrc).then((aspectRatio) => {
    setAspectRatio(aspectRatio);
  });

  return (
    <div>
      {detailOpen && (
        <ImageDetail
          item={item}
          onClose={() => setDetailOpen(false)}
          open={detailOpen}
          imageSrc={imageSrc}
        />
      )}
      {loading ? (
        <Skeleton variant="rectangular">
          <img
            style={{ width: "100%", objectFit: "cover" }}
            src={imageSrc}
            onLoad={() => {
              setLoading(false);
            }}
          />
        </Skeleton>
      ) : (
        <div
          style={{
            width: "100%",
            cursor: "pointer",
          }}
          className={style.imgCardContainer}
          onClick={() => {
            handleImgClick ? handleImgClick(item) : setDetailOpen(true);
          }}
          onMouseOver={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
        >
          <Paper className={style.imgCard}>
            <AspectRatio ratio={aspectRatio}>
              <Card
                sx={{
                  "--Card-radius": "4px",
                }}
              >
                <CardCover>
                  <img
                    src={imageSrc}
                    srcSet={imageSrc}
                    loading="lazy"
                    alt={item.name}
                  />
                </CardCover>
                {hoverState && !hoverNoTitle ? (
                  <CardCover
                    sx={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 4rem), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 5rem)",
                    }}
                  />
                ) : null}
                {hoverState && !hoverNoTitle ? (
                  <CardContent
                    sx={{
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Typography
                      level="h2"
                      fontSize="lg"
                      textColor="#fff"
                      p={2}
                      style={{
                        userSelect: "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        boxSizing: "border-box",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name || "Untitled"}
                    </Typography>
                  </CardContent>
                ) : null}
              </Card>
            </AspectRatio>
          </Paper>
        </div>
      )}
    </div>
  );
}
