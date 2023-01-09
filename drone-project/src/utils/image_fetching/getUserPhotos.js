export default async function getUserPhotos({ supabase, user_id, setUserPhotos, setError }) {
    const { data, error } = await supabase
        .from("photos_metadata")
        .select("*")
        .eq("user_id", user_id);
    if (error) {
        console.log(error);
        if (setError) setError(error);
    }
    setUserPhotos(data);
}