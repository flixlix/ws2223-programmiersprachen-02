export default async function checkUnauthUser({ setIsLoggedIn, supabase }) {
    const { data, error } = await supabase.auth.getUser();
    if (!data.user || error) {
        setIsLoggedIn(false);
    }
    if (data.user) {
        setIsLoggedIn(true);
    }
}