import React from "react";
import { Masonry } from "@mui/lab";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Skeleton } from "@mui/material";
import ImageCard from "../ImageCard/ImageCard";
import Header from "../Header/Header";

export default function Gallery({ photos }) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [table, setTable] = React.useState(null);
  async function getMetadataTable() {
    const { data, error } = await supabase.from("photos_metadata").select("*");
    if (error) {
      console.log(error);
    }
    setTable(data);
  }

  React.useEffect(() => {
    getMetadataTable();
  }, []);

  return (
    <div id="gallery-masonry">
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          padding: 4,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {photos ? (
            <>
              {photos.map((item) => {
                return (
                  <div
                    key={item.id}
                    id={item.id}
                  >
                    <ImageCard item={item} />
                  </div>
                );
              })}
            </>
          ) : (
            table &&
            table.map((item) => {
              return (
                <div key={item.id}>
                  <ImageCard item={item} />
                </div>
              );
            })
          )}
        </Masonry>
      </Box>
    </div>
  );
}
