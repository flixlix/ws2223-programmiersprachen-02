export default async function getUserMetadataFromUsername({ supabase, username, setUserMetadata }) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username);
    if (error) {
        console.log(error);
    }
    setUserMetadata(data[0]);
}