export default async function getUsernameFromUserId({ user_id, supabase }) {

    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user_id)
        .single();
    if (error) {
        console.log('error', error);
        return error;
    }
    if (data) {
        return data.username;
    };
    return 'No username found';
}
