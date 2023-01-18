import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import Gallery from "../../Gallery/Gallery";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import getUserPhotos from "../../../utils/image_fetching/getUserPhotos";
import EditUploads from "./EditUploads/EditUploads";

export default function UploadPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [userPhotos, setUserPhotos] = React.useState(null);
  const [uploadSelected, setUploadSelected] = React.useState(null);

  React.useEffect(() => {
    getUserPhotos({
      supabase,
      session,
      user_id: session.user.id,
      setUserPhotos,
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
        <Stack
          spacing={0}
          direction="column"
          id="edit-upload-left"
          sx={{
            padding: 5,
            paddingBottom: 0,
          }}
        >
          <Typography variant="h5">Your Uploads</Typography>
        </Stack>
        <Gallery
          photos={userPhotos}
          hoverNoTitle
          handleImgClick={(e) => handleImgClick(e)}
        />
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
