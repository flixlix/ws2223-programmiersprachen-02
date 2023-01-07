import React from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Gallery from "../src/components/Gallery/Gallery";
import Header from "../src/components/Header/Header";
import HeroUser from "../src/components/HeroUser/HeroUser";

/* accept username in url */
/* export async function getServerSideProps(context) {
  const { username } = context.query;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);
  if (error) {
    console.log(error);
  }
  console.log(data);
  return {
    props: {
      user: data[0],
    },
  };
} */
export default function user() {
  const router = useRouter();
  const { user } = router.query;
  console.log(user);
  const supabase = useSupabaseClient();
  const session = useSession();
  const [user_metadata, setUserMetadata] = React.useState(null);
  const [user_photos, setUserPhotos] = React.useState(null);

  async function getUserMetadata() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", user);
    if (error) {
      console.log(error);
    }
    setUserMetadata(data[0]);
  }

  async function getUserPhotos() {
    const { data, error } = await supabase
      .from("photos_metadata")
      .select("*")
      .eq("user_id", user_metadata.id);
    if (error) {
      console.log(error);
    }
    setUserPhotos(data);
  }

  React.useEffect(() => {
    if (user) {
      getUserMetadata();
    }
  }, [user]);

  React.useEffect(() => {
    if (user_metadata) {
      getUserPhotos();
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
