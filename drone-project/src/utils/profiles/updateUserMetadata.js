export default async function updateUserMetadata({
    supabase,
    user_id,
    newUserData,
    setUsernameError,
    profiles,
}) {
    // Check if username is already taken
    let error = "";
    if (profiles.length === 0) error = "No profiles found";
    setUsernameError(''); // Clear error
    profiles.forEach(async (profile) => {
        if (profile.id !== newUserData.id) {
            if (profile.username === newUserData.username) {
                setUsernameError('Username already taken');
                error = "Username already taken";
            }
        }
    });
    if (error !== "") return { error: error };
    const { error: updateError } = await supabase
        .from('profiles')
        .update({
            username: newUserData.username,
            first_name: newUserData.first_name,
            last_name: newUserData.last_name,
            email: newUserData.email
        })
        .eq('id', newUserData.id);
    if (updateError) {
        console.log('error', updateError);
        error = updateError.message;
    } else {
        error = "";
    }
    ;
    return { error: error };
}