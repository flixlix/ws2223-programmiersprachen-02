import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import Gallery from "../../Gallery/Gallery";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import getFavorites from "../../../utils/image_fetching/getFavorites";

export default function UploadPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [favoritePhotos, setFavoritePhotos] = React.useState(null);
  const [uploadSelected, setUploadSelected] = React.useState(null);

  React.useEffect(() => {
    getFavorites({
      supabase,
      session,
      user_id: session.user.id,
      setFavoritePhotos,
    });
  }, []);

  function handleImgClick(e) {
    console.log(e);
    setUploadSelected(e);
  }
  function UploadsSection() {
    return (
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            paddingInline: 5,
          }}
        >
          Photos you like
        </Typography>
        {favoritePhotos && <Gallery hoverNoTitle photos={favoritePhotos} />}
      </Box>
    );
  }
  return (
    <Stack
      sx={{
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
        padding: 2,
      }}
    >
      {uploadSelected ? (
        <EditUploads
          item={uploadSelected}
          setUploadSelected={setUploadSelected}
          supabase={supabase}
        />
      ) : (
        <UploadsSection />
      )}
    </Stack>
  );
}
