import React from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Gallery from "../src/components/Gallery/Gallery";
import Header from "../src/components/Header/Header";
import HeroUser from "../src/components/HeroUser/HeroUser";
import getUserPhotos from "../src/utils/image_fetching/getUserPhotos";
import getUserMetadataFromUsername from "../src/utils/profiles/getUserMetadataFromUsername";

export default function user() {
  const router = useRouter();
  const { user } = router.query;
  const supabase = useSupabaseClient();
  const session = useSession();
  const [user_metadata, setUserMetadata] = React.useState(null);
  const [user_photos, setUserPhotos] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      getUserMetadataFromUsername({
        supabase,
        username: user,
        setUserMetadata,
      });
    }
  }, [user]);

  React.useEffect(() => {
    if (user_metadata) {
      getUserPhotos({ supabase, user_id: user_metadata.id, setUserPhotos });
    }
  }, [user_metadata]);

  return (
    <div>
      <Header />
      <HeroUser user_metadata={user_metadata} />
      {/* if there are photos for the user, display them */}
      {user_photos && <Gallery photos={user_photos} />}
    </div>
  );
}
