import React from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Gallery from "../src/components/Gallery/Gallery";
import { useRouter } from "next/router";
import Header from "../src/components/Header/Header";

const Home = () => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div id="home">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Gallery searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default Home;

{
  /* <SignIn /> */
}
