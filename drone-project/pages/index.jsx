import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Gallery from "../src/components/Gallery/Gallery";
import SignIn from "../src/components/SignIn/SignIn";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../src/components/Header/Header";
import TemporaryDrawer from "../src/components/TemporaryDrawer/TemporaryDrawer";

const Home = () => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div id="home">
      <Header />
      {/* <TemporaryDrawer /> */}
      <Gallery />
    </div>
  );
};

export default Home;

{
  /* <SignIn /> */
}
