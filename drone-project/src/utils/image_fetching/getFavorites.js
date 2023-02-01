export default async function getUserPhotos({ supabase, user_id, setFavoritePhotos, setError }) {
    const { data, error } = await supabase
        .from("photos_metadata")
        .select("*");
    if (error) {
        console.log(error);
        if (setError) setError(error);
    }
    console.log(data);
    /* filter data only allow images that have the user_id in the likes array */
    let filteredData = data.filter((photo) => {
        return photo.likes.includes(user_id);
    });
    console.log(filteredData)
    setFavoritePhotos(filteredData);
}