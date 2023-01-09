export default async function getAllProfiles({ supabase, setProfiles, setError }) {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
        console.log(error);
        if (setError) setError(error);
    }
    setProfiles(data);
}