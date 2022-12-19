

/* upload photo to supabase storage bucket */
export const uploadPhoto = async ({supabase, file}) => {
    const { data, error } = await supabase.storage
        .from("images")
        .upload(`images/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
        });
    if (error) {
        console.log("error", error);
    }
    return data;
};
    