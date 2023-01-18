export default async function getTableMetadataPhotos({ supabase, setTable, setError }) {
    const { data, error } = await supabase.from("photos_metadata").select("*");
    if (error) {
        console.log(error);
        if (setError) setError(error);
    }
    data.sort((a, b) => {
        const likesA = a.likes.length;
        const likesB = b.likes.length;
        if (likesA > likesB) {
            return -1;
        }
        if (likesA < likesB) {
            return 1;
        }
        const createdAtA = a.created_at;
        const createdAtB = b.created_at;
        if (createdAtA > createdAtB) {
            return 1;
        }
        if (createdAtA < createdAtB) {
            return -1;
        }
        return 0;
    });
    setTable(data);
}