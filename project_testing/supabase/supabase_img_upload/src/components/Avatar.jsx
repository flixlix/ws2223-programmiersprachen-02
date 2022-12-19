import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Typography } from "@mui/material";

export default function Avatar({ url, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Typography variant="h3" component="label">
        Upload an avatar
      </Typography>
      <img
        src={avatarUrl ? avatarUrl : ""}
        alt={avatarUrl ? "Avatar" : "No image"}
        className="avatar image"
        style={{ height: "200px", width: "200px", borderRadius: "200px" }}
      />
      {uploading ? (
        "Uploading..."
      ) : (
        <>
          <div className="visually-hidden">
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                multiple
                type="file"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
