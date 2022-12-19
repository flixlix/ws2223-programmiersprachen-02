import { uploadPhoto } from "../src/components/utils/imgUpload"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
  const supabase = useSupabaseClient();

  const file = "10.png";
  return (
    <>
      <button onClick={() => uploadPhoto({ supabase, file  })}>
        Upload Photo
        </button>
    </>
  )
}
