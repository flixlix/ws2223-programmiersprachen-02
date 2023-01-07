export default async function checkIfUserIsLoggedIn({supabase}) {
    const user = supabase.auth.getUser();
    if (user) {
        return user;
    }
    return null;
}
