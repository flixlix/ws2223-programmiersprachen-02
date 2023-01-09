export default async function getUserMetadataFromId({ supabase, user_id, setUserMetadata }) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user_id);
    if (error) {
        console.log(error);
    }
    setUserMetadata(data[0]);
}