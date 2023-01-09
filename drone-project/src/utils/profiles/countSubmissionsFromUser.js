export default async function countSubmissionsFromUser({ user_id, setNumberOfSubmissions, supabase, setError }) {
    const { data, error } = await supabase
        .from('photos_metadata')
        .select('id')
        .eq('user_id', user_id);
    if (error) {
        console.log('error', error);
        if (setError) setError(error);
    }
    if (data.length) {
        setNumberOfSubmissions(data.length);
    }
}