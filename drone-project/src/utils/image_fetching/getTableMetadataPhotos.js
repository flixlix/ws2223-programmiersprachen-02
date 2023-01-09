export default async function getTableMetadataPhotos({ supabase, setTable, setError }) {
    const { data, error } = await supabase.from("photos_metadata").select("*");
    if (error) {
        console.log(error);
        if (setError) setError(error);
    }
    setTable(data);
}