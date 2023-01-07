import React from "react";
import { Masonry } from "@mui/lab";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Skeleton, Typography } from "@mui/material";
import ImageCard from "../ImageCard/ImageCard";
import { useRouter } from "next/router";

export default function Gallery({ photos, searchQuery, setSearchQuery }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { urlSearchQuery } = router.query;
  const session = useSession();
  const [table, setTable] = React.useState(null);
  const [profiles, setProfiles] = React.useState(null);
  const [tableSearchResults, setTableSearchResults] = React.useState(null);

  async function getProfiles() {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.log(error);
    }
    setProfiles(data);
  }

  async function getMetadataTable() {
    const { data, error } = await supabase.from("photos_metadata").select("*");
    if (error) {
      console.log(error);
    }
    setTable(data);
  }

  React.useEffect(() => {
    getMetadataTable();
    getProfiles();
  }, []);

  React.useEffect(() => {
    if (urlSearchQuery) {
      console.log("urlSearchQuery", urlSearchQuery);
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  React.useEffect(() => {
    if (table) searchPhotos();
  }, [searchQuery]);

  function searchPhotos() {
    const results = table.filter((item) => {
      if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      if (item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      if (isQueryInTags(searchQuery, item.tags) === true) {
        return true;
      }
      if (isThereUser(searchQuery, item) === true) {
        return true;
      }
      return false;
    });
    setTableSearchResults(results);
  }

  function isThereUser(query, item) {
    let foundOne = false;
    /* if person who uploaded the image has name in query */
    profiles.filter((profile) => {
      if (profile.id === item.user_id) {
        if (profile.username.toLowerCase().includes(query.toLowerCase())) {
          foundOne = true;
        }

        if (profile.friendly_name.toLowerCase().includes(query.toLowerCase())) {
          foundOne = true;
        }

        if (profile.email.toLowerCase().includes(query.toLowerCase())) {
          foundOne = true;
        }
      }
    });
    return foundOne;
  }

  function isQueryInTags(query, tags) {
    let foundOne = false;
    tags.map((tag) => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        foundOne = true;
      }
    });
    return foundOne;
  }

  React.useEffect(() => {
    console.log("tableSearchResults", tableSearchResults);
  }, [tableSearchResults]);

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
