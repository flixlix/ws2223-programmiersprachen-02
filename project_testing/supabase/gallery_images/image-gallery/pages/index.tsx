import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABACE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin

    .from("images")
    .select("*")
    .order("id", { ascending: true });

  return {
    props: {
      images: data,
    },
  };
}

function cn(...args: string[]) {
  return args.filter(Boolean).join(" ");
}

type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string;
};

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <>
      <Masonry columns={3} spacing={2}>
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </Masonry>
      <Link href="/add">
        <Fab size="medium" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
}

function BlurImage({ image }: { image: Image }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <a href={image.href} className="group">
      <Image
        src={image.imageSrc}
        width={500}
        height={500}
        alt=""
        objectFit="cover"
        className={cn(
          "group-hover:opacity-75 duration-700 ease-in-out",
          !loaded
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100"
        )}
        onLoadingComplete={() => setLoaded(true)}
      />
    </a>
  );
}
