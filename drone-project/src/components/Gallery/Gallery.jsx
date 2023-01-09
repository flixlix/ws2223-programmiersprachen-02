import React from "react";
import { Masonry } from "@mui/lab";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Skeleton, Typography } from "@mui/material";
import ImageCard from "../ImageCard/ImageCard";
import { useRouter } from "next/router";
import getTableMetadataPhotos from "../../utils/image_fetching/getTableMetadataPhotos";
import getAllProfiles from "../../utils/profiles/getAllProfiles";
import searchPhotos from "../../utils/search/searchPhotos";

export default function Gallery({ photos, searchQuery, setSearchQuery }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { urlSearchQuery } = router.query;
  const session = useSession();
  const [table, setTable] = React.useState(null);
  const [profiles, setProfiles] = React.useState(null);
  const [tableSearchResults, setTableSearchResults] = React.useState(null);

  React.useEffect(() => {
    getTableMetadataPhotos({ setTable, supabase });
    getAllProfiles({ setProfiles, supabase });
  }, []);

  React.useEffect(() => {
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  React.useEffect(() => {
    if (table)
      searchPhotos({ profiles, table, setTableSearchResults, searchQuery });
  }, [searchQuery]);

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
          <>
            {photos ? (
              <>
                {photos.map((item) => {
                  return (
                    <div key={item.id} id={item.id}>
                      <ImageCard item={item} />
                    </div>
                  );
                })}
              </>
            ) : searchQuery ? (
              tableSearchResults && tableSearchResults.length > 0 ? (
                tableSearchResults.map((item) => {
                  return (
                    <div key={item.id}>
                      <ImageCard item={item} />
                    </div>
                  );
                })
              ) : (
                <div>
                  <Typography variant="h4" color="grey" fontWeight="light">
                    No results found
                  </Typography>
                </div>
              )
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
          </>
        </Masonry>
      </Box>
    </div>
  );
}
