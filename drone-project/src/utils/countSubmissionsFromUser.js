export default async function countSubmissionsFromUser({ user_id, supabase }) {
    const { data, error } = await supabase
        .from('photos_metadata')
        .select('id')
        .eq('user_id', user_id);
    if (error) {
        console.log('error', error);
    }
    return data;
}